import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class ProductList extends Component {
    protected LOCATORS = {
        myPickButton: this.locator.locator('[aria-label="myPick"]'),
    };

    public async waitForProduct(): Promise<void> {
        await this.locator.waitFor({ state: 'visible' });
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async clickMyPick(): Promise<void> {
        await this.LOCATORS.myPickButton.waitFor({ state: 'visible' });
        await this.LOCATORS.myPickButton.click();
    }

    public async getAtributeMyPick(): Promise<string | null> {
        await this.LOCATORS.myPickButton.waitFor({ state: 'visible' });
        return await this.LOCATORS.myPickButton.getAttribute('aria-pressed');
    }

    public async getProductId(): Promise<string | null> {
        return await this.locator.getAttribute('data-test-id');
    }

    public async scrollToSection(): Promise<void> {
        await this.locator.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.locator.all();
    }
}
