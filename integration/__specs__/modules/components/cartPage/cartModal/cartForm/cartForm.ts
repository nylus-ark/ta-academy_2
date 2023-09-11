import { Component } from '@Core/component';

export class CartForm extends Component {
    protected selectors = {
        inputName: '[data-testid="input-name"]',
        inputPrice: '[data-testid="input-price"]',
        inputQuantity: '[data-testid="input-quantity"]',
        submitBtn: '//button[contains (., "Create")]',
    };

    public async getInputName(): Promise<Component> {
        const [inputNameElement] = await this.element.waitForQuerySelector(this.selectors.inputName);
        return new Component(inputNameElement);
    }

    public async getInputPrice(): Promise<Component> {
        const [inputPriceElement] = await this.element.waitForQuerySelector(this.selectors.inputPrice);
        return new Component(inputPriceElement);
    }

    public async getInputQuantity(): Promise<Component> {
        const [inputQuantityElement] = await this.element.waitForQuerySelector(this.selectors.inputQuantity);
        return new Component(inputQuantityElement);
    }

    public async fillForm(name: string, price: string, quantity: string): Promise<void> {
        const inputName = await this.getInputName();
        const inputPrice = await this.getInputPrice();
        const inputQuantity = await this.getInputQuantity();

        inputName.input(name);
        inputPrice.input(price);
        inputQuantity.input(quantity);
    }

    public async submitForm(): Promise<void> {
        await this.element.clickByXpath(this.selectors.submitBtn);
    }
}
