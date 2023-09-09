import { test, expect } from '@Test';

test.describe('verify My Pick functionality', () => {
    test('clicking My Pick button adds product to wishlist', async ({
        page,
        baseURL,
        categoryPage,
        dataLayer,
    }) => {
        await categoryPage.open('sunglasses');

        await test.step('check url', () => {
            const url = page.url();

            expect(url).toBe(`${baseURL}sunglasses`);
        });

        await test.step('click My pick button on first product', async () => {
            await categoryPage.ProductItem.waitForProduct();
            await categoryPage.ProductItem.clickMyPick();

            const dataTestActiveAfterClick = await categoryPage.ProductItem.getAtributeMyPick();

            await expect(() => {
                expect(dataTestActiveAfterClick).toBe('true');
            }).toPass();
        });

        await test.step('check visible icon of quantity products in wishlist button', async () => {
            const myPicksIconCountIsVisible = await categoryPage.Header.myPicksIconCountIsVisible();

            expect(myPicksIconCountIsVisible).toBe(true);
        });

        await test.step('verify event in the dataLayer', async () => {
            const expectedEvent = {
                event: 'CategoryInteraction',
                eventCategory: 'Category - D',
                eventAction: 'Product',
                eventLabel: 'Add to Wishlist',
            };

            const [event] = await dataLayer.waitForDataLayer({
                event: 'CategoryInteraction',
                eventCategory: 'Category - D',
                eventAction: 'Product',
            });

            expect(event).toStrictEqual(expectedEvent);
        });

        await test.step('check added product in wishlist modal', async () => {
            await categoryPage.Header.clickWishListBtn();
            await categoryPage.waitForMyPicksList();

            const productId = await categoryPage.ProductItem.getProductId();
            const wishlistProductId = await categoryPage.MyPicksList.getAttributeMyPicksItem();
            const isProductInWishlist = await categoryPage.MyPicksList.visibleMyPicksItem();

            expect(isProductInWishlist).toBe(true);
            expect(productId).toBe(wishlistProductId);
        });
    });
});
