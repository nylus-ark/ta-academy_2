import { Container } from '@Core/container';
import { FeaturedIn } from '@Components/featuredIn';
import { FormRegister } from '@Components/formRegister';
import { Header } from '@Components/header';
import { Footer } from '@Components/footer';

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        formRegister: this.page.locator('[id="form-popup-register"]'),
        header: this.page.locator('//header'),
        footer: this.page.locator('//footer'),
    };

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);

    public FormRegister = new FormRegister(this.LOCATORS.formRegister, this.page);

    public Header = new Header(this.LOCATORS.header, this.page);

    public Footer = new Footer(this.LOCATORS.footer, this.page);
}
