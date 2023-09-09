import { test, expect } from '@Test';

test.use({ trace: 'on' });

test.describe('check My Account functionality', () => {
    test('check dataLayer event and modify detail information', async ({
        baseURL,
        homePage,
        accountPage,
        page,
        dataLayer,
        dataGenerator,
    }) => {
        await homePage.open();

        await test.step('click on My Account and Create Account buttons', async () => {
            await homePage.Header.clickCreateAccount();
        });

        await test.step('fill and submit the form', async () => {
            await homePage.FormRegister.fillEmailWithGeneratedData(dataGenerator);
            await homePage.FormRegister.submitForm();

            await homePage.FormRegister.fillFormWithGeneratedData(dataGenerator);
            await homePage.FormRegister.submitForm();
        });

        await test.step('event should fire after form submit', async () => {
            const expectedEvent = {
                event: 'GeneralNonInteraction',
                eventCategory: 'Login',
                eventAction: 'Login Status',
                eventLabel: 'Registered - Email',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralNonInteraction',
                    eventCategory: 'Login',
                    eventAction: 'Login Status',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });

        await test.step('go to Account page', async () => {
            await homePage.Header.clickWelcomeBtn();
            await homePage.Header.clickAccountLink();
        });

        await test.step('verify url', () => {
            const url = page.url();

            expect(url).toBe(`${baseURL}customer/account`);
        });

        dataGenerator.refresh();

        const currentValues = {
            firstName: dataGenerator.firstName,
            lastName: dataGenerator.lastName,
        };

        await test.step('change detail information', async () => {
            await accountPage.profileSideBar.myDetailBtnClick();

            await accountPage.myDetails.clickEditInformation();

            await accountPage.myDetailsForm.fillFirstName(currentValues.firstName);
            await accountPage.myDetailsForm.fillLastName(currentValues.lastName);

            await accountPage.myDetailsForm.clickSaveBtn();
        });

        await test.step('check updated values in My Details form', async () => {
            const updateValues = {
                firstName: await accountPage.myDetailsForm.getValueFirstName(),
                lastName: await accountPage.myDetailsForm.getValueLastName(),
            };

            expect(currentValues).toEqual(updateValues);

            await accountPage.myDetailsForm.clickCloseBtn();
        });

        await test.step('check updated values in My Details section', async () => {
            await accountPage.profileSideBar.myDetailBtnClick();

            const detailValues = {
                firstName: await accountPage.myDetails.getFirstName(),
                lastName: await accountPage.myDetails.getLastName(),
            };

            console.log(JSON.stringify(currentValues) + ' and ' + JSON.stringify(detailValues));
            expect(currentValues).toEqual(detailValues);
        });
    });
});
