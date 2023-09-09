import { Component } from '@Core/component';
import type { DataGenerator } from '@Utils/dataGenerate';

export class FormRegister extends Component {
    private LOCATORS = {
        emailInput: this.locator.locator('//input[@name="email"]'),
        firstNameInput: this.locator.locator('//input[@name="firstName"]'),
        lastNameInput: this.locator.locator('//input[@name="lastName"]'),
        passwordInput: this.locator.locator('//input[@name="password"]'),
        submitButton: this.locator.locator('//button[contains(., "Sign Up")]'),
    };

    public async fillEmail(email: string): Promise<void> {
        await this.LOCATORS.emailInput.fill(email);
    }

    public async fillFirstName(firstName: string): Promise<void> {
        await this.LOCATORS.firstNameInput.fill(firstName);
    }

    public async fillLastName(lastName: string): Promise<void> {
        await this.LOCATORS.lastNameInput.fill(lastName);
    }

    public async fillPassword(password: string): Promise<void> {
        await this.LOCATORS.passwordInput.fill(password);
    }

    public async submitForm(): Promise<void> {
        await this.LOCATORS.submitButton.click();
    }

    public async fillEmailWithGeneratedData(dataGenerator: DataGenerator): Promise<void> {
        await this.fillEmail(dataGenerator.email);
    }

    public async fillFormWithGeneratedData(dataGenerator: DataGenerator): Promise<void> {
        await this.fillFirstName(dataGenerator.firstName);
        await this.fillLastName(dataGenerator.lastName);
        await this.fillPassword(dataGenerator.password);
    }
}
