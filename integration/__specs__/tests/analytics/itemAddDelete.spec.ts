import { CartPage } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { waitForDataLayer } from '@Utils/dataLayer';
import { DataGenerator } from '@Utils/dataGenerate';

describe('Check dataLayer event on cart page', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;
    let dataGenerate: DataGenerator;

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
        dataGenerate = new DataGenerator();
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
        dataGenerate.refresh();
    });

    test('Check events should be in dataLayer', async () => {
        await cartPage.fulfill();

        const cartList = await cartPage.getCartList();
        const cartItemsLength = await cartList.getCartItemsCount();

        await cartPage.clickAddCartItemBtn();

        reporter.startStep('FormInteraction event');
        const formEvent = await waitForDataLayer({ name: 'FormInteraction' });
        expect(formEvent).toStrictEqual({ name: 'FormInteraction', value: 'Open' });
        reporter.endStep();

        const cartModal = await cartPage.getModal();
        const cartForm = await cartModal.getForm();

        const productName = dataGenerate.productName;
        const productPrice = dataGenerate.productPrice;
        const productQuantity = dataGenerate.productQuantity.toString();

        await cartForm.fillForm(productName, productPrice, productQuantity);
        await cartForm.submitForm();

        reporter.startStep('Add item event');
        const addEvent = await waitForDataLayer({ name: `Add item - ${productName}` });
        expect(addEvent).toStrictEqual({
            name: `Add item - ${productName}`,
            price: parseInt(productPrice),
            quantity: parseInt(productQuantity),
            value: productName,
        });
        reporter.endStep();

        const updatedCartItemsLength = await cartList.getCartItemsCount();

        reporter.startStep('Item quantity should be increased by one');
        expect(updatedCartItemsLength).toBe(cartItemsLength + 1);
        reporter.endStep();

        const [item] = await cartList.getCartItems();
        const itemName = await item.getName();
        const itemPrice = await item.getPrice();
        const itemQuantity = await item.getQuantity();

        reporter.startStep('Item name should be correct');
        expect(itemName).toBe(productName);
        reporter.endStep();

        reporter.startStep('Item price should be correct');
        expect(itemPrice).toBe(parseInt(productPrice));
        reporter.endStep();

        reporter.startStep('Item quantity should be correct');
        expect(itemQuantity).toBe(parseInt(productQuantity));
        reporter.endStep();

        await item.deleteItem();

        const finalCartItemsLength = await cartList.getCartItemsCount();

        reporter.startStep('Cart items length should be back to original');
        expect(finalCartItemsLength).toBe(cartItemsLength);
        reporter.endStep();

        reporter.startStep('Delete item event');
        const deleteEvent = await waitForDataLayer({ name: `Delete item - ${productName}` });
        expect(deleteEvent).toStrictEqual({ name: `Delete item - ${productName}`, value: productName });
        reporter.endStep();

        await cartList.deleteAllCartItems();

        reporter.startStep('Cart is empty event');
        const deleteAllEvent = await waitForDataLayer({ name: 'Cart is Empty' });
        expect(deleteAllEvent).toStrictEqual({ name: 'Cart is Empty', value: 'Quantity of products: 0' });
        reporter.endStep();
    });
});
