import { Component } from '@Core/component';
import type { DataGenerator } from '@Utils/dataGenerate';

export class Footer extends Component {
    protected LOCATORS = {
        emailInput: this.locator.locator('//input[contains(@placeholder, "Enter your Email")]'),
        singUpBtn: this.locator.locator('//button//div[contains(text(), "Sign Up")]'),
    };

    public async scrollToSection(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async fillEmailInput(dataGenerator: DataGenerator): Promise<void> {
        await this.LOCATORS.emailInput.waitFor({ state: 'visible' });
        await this.LOCATORS.emailInput.fill(dataGenerator.email);
    }

    public async waitForEmailInputFilled(): Promise<void> {
        await this.LOCATORS.emailInput.waitFor({ state: 'visible' });
    }

    public async clickSignUpBtn(): Promise<void> {
        await this.waitForEmailInputFilled();
        await this.LOCATORS.singUpBtn.click();
    }
}
