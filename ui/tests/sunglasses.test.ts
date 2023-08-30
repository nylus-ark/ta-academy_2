import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { timeout } from '@Utils/timeout';

test.describe('verify My Pick functionality in product card on Sunglasses page', () => {
    const expectedEvent = {
        event: 'CategoryInteraction',
        eventCategory: 'Category - D',
        eventAction: 'Product',
        eventLabel: 'Add to Wishlist',
    };

    let dataLayer: DataLayer;

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        dataLayer = new DataLayer(page);
    });

    test('clicking My Pick button adds product to wishlist', async ({ page, baseURL }) => {
        await test.step('navigate to Sunglasses page', async () => {
            const sunglasses = page.locator('//nav//a[contains(., "Sunglasses")]');

            await sunglasses.click();
            await page.waitForLoadState('load');
        });

        await test.step('verify url', () => {
            const url = page.url();

            expect(url).toBe(`${baseURL}sunglasses`);
        });

        const products = await page.locator('[data-test-name="product"]').all();
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomProduct = products[randomIndex];

        await test.step('click My pick button on a random product', async () => {
            const myPickWrapper = randomProduct.locator('[data-testid="myPickWrapper"]');
            const myPickButton = randomProduct.locator('[aria-label="myPick"]');

            await myPickWrapper.click();

            const dataTestActiveAfterClick = await myPickWrapper.getAttribute('data-test-active');
            const ariaPressedAfterClick = await myPickButton.getAttribute('aria-pressed');

            expect(dataTestActiveAfterClick).toBe('true');
            expect(ariaPressedAfterClick).toBe('true');
        });

        await test.step('check visible icon of quantity products in wishlist button', async () => {
            const spanElement = page.locator(
                '//header//div/button[@type="button"]/div[@aria-label="View My Picks"]/span'
            );

            expect(await spanElement.isVisible()).toBe(true);
        });

        await test.step('verify event in the dataLayer', async () => {
            const [event] = await dataLayer.waitForDataLayer({
                event: 'CategoryInteraction',
                eventCategory: 'Category - D',
                eventAction: 'Product',
            });

            expect(event).toStrictEqual(expectedEvent);
        });

        await test.step('check added product in wishlist modal', async () => {
            const wishlistBtn = page.locator(
                '//header//div/button[@type="button" and @aria-label="Open Tooltip"]/div[@aria-label="View My Picks"]'
            );

            await wishlistBtn.click();
            await timeout(2000);

            const productId = await randomProduct.getAttribute('data-test-id');
            const wishlistProduct = page.locator('//div[@data-productid]');
            const wishlistProductId = await wishlistProduct.getAttribute('data-productid');
            const isProductInWishlist = await wishlistProduct.isVisible();

            expect(isProductInWishlist).toBe(true);
            expect(productId).toBe(wishlistProductId);
        });
    });
});
