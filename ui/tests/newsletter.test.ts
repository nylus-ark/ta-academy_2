import { test, expect } from '@Test';

test.describe('check event in Datalayer', () => {
    test('event should fire after submitting the form', async ({
        page,
        homePage,
        dataLayer,
        dataGenerator,
    }) => {
        await homePage.open();

        await test.step('fill email field and submit the form', async () => {
            await homePage.Footer.scrollToSection();
            await homePage.Footer.fillEmailInput(dataGenerator);
            await homePage.Footer.clickSignUpBtn();
        });

        await test.step('verify the event in the dataLayer', async () => {
            const expectedEvent = {
                event: 'GeneralInteraction',
                eventCategory: 'Footer - D',
                eventAction: 'Newsletter Subscription',
                eventLabel: 'Success',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralInteraction',
                    eventCategory: 'Footer - D',
                    eventAction: 'Newsletter Subscription',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });

        await test.step('output the dataLayer to console', async () => {
            const dataLayerOutput = await page.evaluate(() => window.dataLayer);
            console.log(dataLayerOutput);
        });
    });
});
