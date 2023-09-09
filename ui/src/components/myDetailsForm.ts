import { Component } from '@Core/component';

export class MyDetailsForm extends Component {
    protected LOCATORS = {
        firstNameInput: this.locator.locator('//input[@placeholder="First Name"]'),
        lastNameInput: this.locator.locator('//input[@placeholder="Last Name"]'),
        saveBtn: this.locator.locator('//button[contains (., "Save")]'),
        closeBtn: this.locator.locator('//button[contains (., "Close")]'),
    };

    public async fillFirstName(firstName: string): Promise<void> {
        await this.LOCATORS.firstNameInput.fill(firstName);
    }

    public async getValueFirstName(): Promise<string | null> {
        return await this.LOCATORS.firstNameInput.getAttribute('value');
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.LOCATORS.lastNameInput.fill(lastName);
    }

    public async getValueLastName(): Promise<string | null> {
        return await this.LOCATORS.lastNameInput.getAttribute('value');
    }

    public async clickSaveBtn(): Promise<void> {
        await this.LOCATORS.saveBtn.click();
    }

    public async clickCloseBtn(): Promise<void> {
        await this.LOCATORS.closeBtn.click();
    }
}
