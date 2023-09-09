import { Container } from '@Core/container';
import { MyDetails } from '@Components/myDetails';
import { MyDetailsForm } from '@Components/myDetailsForm';
import { ProfileSideBar } from '@Components/profileSideBar';

export class AccountPage extends Container {
    protected LOCATORS = {
        profileSideBar: this.page.locator('[data-testid="profile"]'),
        myDetails: this.page.locator('[data-testid="section-myDetails"]'),
        myDetailsForm: this.page.locator('//div[div[span[text() = "My Details"]]]'),
    };

    public async open(): Promise<void> {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }

    public profileSideBar = new ProfileSideBar(this.LOCATORS.profileSideBar, this.page);

    public myDetails = new MyDetails(this.LOCATORS.myDetails, this.page);

    public myDetailsForm = new MyDetailsForm(this.LOCATORS.myDetailsForm, this.page);
}
