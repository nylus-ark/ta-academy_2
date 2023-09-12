import { Component } from '@Core/component';
import { CartForm } from '@Components/cartPage/cartModal/cartForm/cartForm';

export class CartModal extends Component {
    protected selectors = {
        form: '[data-testid="form"]',
    };

    public getForm(): CartForm {
        const cartForm = this.element.querySelector(this.selectors.form);
        return new CartForm(cartForm);
    }
}
