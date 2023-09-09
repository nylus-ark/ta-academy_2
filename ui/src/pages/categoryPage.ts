import { Header } from '@Components/header';
import { MyPicks } from '@Components/myPicksList';
import { ProductList } from '@Components/productList';
import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        productList: this.page.locator('[data-test-name="product"]'),
        footer: this.page.locator('//footer[contains(., "Live Chat" )]'),
        header: this.page.locator('//header[@id="page-header"]'),
        myPicksList: this.page.locator('//div[@class="mypicks-tab-data"]//ul'),
    };

    public async open(
        url: 'contact-lenses' | 'sunglasses' | 'eyeglasses-collection'
    ): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }

    public ProductList = new ProductList(this.LOCATORS.productList, this.page);

    public ProductItem = new ProductList(this.LOCATORS.productList.first(), this.page);

    public Header = new Header(this.LOCATORS.header, this.page);

    public MyPicksList = new MyPicks(this.LOCATORS.myPicksList, this.page);

    public async scrollProducts(): Promise<void> {
        await this.LOCATORS.footer.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.productList.all();
    }

    public async waitForMyPicksList(): Promise<void> {
        await this.LOCATORS.myPicksList.waitFor({ state: 'visible' });
    }

    public async scrollProductsList(): Promise<void> {
        await this.LOCATORS.productList.scrollIntoViewIfNeeded();
    }
}
