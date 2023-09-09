import { Component } from '@Core/component';

export class ProfileSideBar extends Component {
    protected LOCATORS = {
        myDetailBtn: this.locator.locator('[data-id="myDetails"]'),
    };

    public async myDetailBtnClick(): Promise<void> {
        await this.LOCATORS.myDetailBtn.waitFor({ state: 'visible' });
        await this.LOCATORS.myDetailBtn.click();
    }
}
