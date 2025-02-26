import { Component } from '@Core/component';
import { CartForm } from '@Components/cartPage/cartModal/cartForm/cartForm';

export class CartModal extends Component {
    protected selectors = {
        form: '[data-testid="form"]',
    };

    public async getForm(): Promise<CartForm> {
        const [cartForm] = await this.element.waitForQuerySelector(this.selectors.form);
        return new CartForm(cartForm);
    }
}
