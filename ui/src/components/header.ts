import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        myAccountBtn: this.locator.locator('//button[contains (., "My Account")]'),
        createAccountBtn: this.locator.locator('//a[contains(., "Create Account")]'),
        welcomeBtn: this.locator.locator('//button[contains (., "Welcome")]'),
        accountLink: this.locator.locator(
            '//a[contains(@href, "/customer/account")][text()="My Account"]'
        ),
        myPicksIconCount: this.locator.locator(
            '//button[@type="button"]/div[@aria-label="View My Picks"]/span'
        ),
        wishListBtn: this.locator.locator('//button[div[contains(@aria-label, "View My Picks")]]'),
    };

    public async clickMyAccountBtn(): Promise<void> {
        await this.LOCATORS.myAccountBtn.click();
    }

    public async clickCreateAccount(): Promise<void> {
        await this.clickMyAccountBtn();
        await this.LOCATORS.createAccountBtn.waitFor({ state: 'visible' });
        await this.LOCATORS.createAccountBtn.click();
    }

    public async clickWelcomeBtn(): Promise<void> {
        await this.LOCATORS.welcomeBtn.click();
    }

    public async clickAccountLink(): Promise<void> {
        await this.LOCATORS.accountLink.waitFor({ state: 'visible' });
        await this.LOCATORS.accountLink.click();
    }

    public async myPicksIconCountIsVisible(): Promise<boolean> {
        return await this.LOCATORS.myPicksIconCount.isVisible();
    }

    public async clickWishListBtn(): Promise<void> {
        await this.LOCATORS.wishListBtn.waitFor({ state: 'visible' });
        await this.LOCATORS.wishListBtn.click();
    }
}
