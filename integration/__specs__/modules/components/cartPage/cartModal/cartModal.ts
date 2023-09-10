import { Component } from '@Core/component';
import { CartForm } from '@Components/cartPage/cartModal/cartForm/cartForm';

export class CartModal extends Component {
    protected selectors = {
        closeModalBtn: '//button[contains(@class, "modal__close-btn")]',
        form: '[data-testid="form"]',
    };

    public async closeModal(): Promise<void> {
        await this.element.clickByXpath(this.selectors.closeModalBtn);
    }

    public getForm(): CartForm {
        const cartForm = this.element.querySelector(this.selectors.form);
        return new CartForm(cartForm);
    }
}
