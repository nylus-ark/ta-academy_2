import { Component } from '@Core/component';

export class MyDetails extends Component {
    protected LOCATORS = {
        editInformation: this.locator.locator('//button[contains (., "Edit Information")]'),
        firstName: this.locator
            .locator('//div[contains(., "First Name:")]/following::div[1]')
            .first(),
        lastName: this.locator
            .locator('//div[contains(., "Last Name:")]/following::div[1]')
            .first(),
    };

    public async clickEditInformation(): Promise<void> {
        await this.LOCATORS.editInformation.click();
    }

    public async getFirstName(): Promise<string | null> {
        const firstNameElement = this.LOCATORS.firstName;
        const firstNameContent = await firstNameElement.textContent();

        return firstNameContent;
    }

    public async getLastName(): Promise<string | null> {
        const lastNameElement = this.LOCATORS.lastName;
        const lastNameContent = await lastNameElement.textContent();

        return lastNameContent;
    }
}
