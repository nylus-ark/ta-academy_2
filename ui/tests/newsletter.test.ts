import { test, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { timeout } from '@Utils/timeout';
import { faker } from '@faker-js/faker';

test.describe('check event in Datalayer', () => {
    const expectedEvent = {
        event: 'GeneralInteraction',
        eventCategory: 'Footer - D',
        eventAction: 'Newsletter Subscription',
        eventLabel: 'Success',
    };

    let dataLayer: DataLayer;
    let fakeEmail: string;

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.mouse.wheel(0, 5500);
        await timeout(5000);

        dataLayer = new DataLayer(page);
        fakeEmail = faker.internet.email();
    });

    test('event should fire after submitting the form', async ({ page }) => {
        await test.step('fill email field with a fake email', async () => {
            const emailField = page.locator(
                '//footer//input[contains(@placeholder, "Enter your Email")]'
            );

            await emailField.fill(fakeEmail);
        });

        await test.step('click the Sign Up button', async () => {
            const signUpBtn = page.locator('//footer//button//div[contains(text(), "Sign Up")]');

            await signUpBtn.click();
        });

        await test.step('verify the event in the dataLayer', async () => {
            const [event] = await dataLayer.waitForDataLayer({
                event: 'GeneralInteraction',
                eventCategory: 'Footer - D',
                eventAction: 'Newsletter Subscription',
            });

            expect(event).toStrictEqual(expectedEvent);
        });

        await test.step('output the dataLayer to console', async () => {
            const dataLayerOutput = await page.evaluate(() => window.dataLayer);
            console.log(dataLayerOutput);
        });
    });
});
