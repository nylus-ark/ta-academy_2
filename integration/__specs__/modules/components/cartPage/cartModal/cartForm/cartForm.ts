import { Component } from '@Core/component';

export class CartForm extends Component {
    protected selectors = {
        inputName: '[data-testid="input-name"]',
        inputPrice: '[data-testid="input-price"]',
        inputQuantity: '[data-testid="input-quantity"]',
        submitBtn: '//button[contains (., "Create")]',
    };

    public getInputName(): Component {
        const inputNameElement = this.element.querySelector(this.selectors.inputName);
        return new Component(inputNameElement);
    }

    public getInputPrice(): Component {
        const inputPriceElement = this.element.querySelector(this.selectors.inputPrice);
        return new Component(inputPriceElement);
    }

    public getInputQuantity(): Component {
        const inputQuantityElement = this.element.querySelector(this.selectors.inputQuantity);
        return new Component(inputQuantityElement);
    }

    public fillForm(name: string, price: string, quantity: string): void {
        const inputName = this.getInputName();
        const inputPrice = this.getInputPrice();
        const inputQuantity = this.getInputQuantity();

        inputName.input(name);
        inputPrice.input(price);
        inputQuantity.input(quantity);
    }

    public async submitForm(): Promise<void> {
        await this.element.clickByXpath(this.selectors.submitBtn);
    }
}
