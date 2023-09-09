import { Component } from '@Core/component';

export class MyPicks extends Component {
    protected LOCATORS = {
        myPicksItem: this.locator.locator('//div[@data-productid]'),
    };

    public async getAttributeMyPicksItem(): Promise<string | null> {
        await this.LOCATORS.myPicksItem.waitFor({ state: 'visible' });
        return await this.LOCATORS.myPicksItem.getAttribute('data-productid');
    }

    public async visibleMyPicksItem(): Promise<boolean> {
        await this.LOCATORS.myPicksItem.waitFor({ state: 'visible' });
        return await this.LOCATORS.myPicksItem.isVisible();
    }
}
