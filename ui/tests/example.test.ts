import { test, expect } from '@playwright/test';
import { timeout } from '@Utils/timeout';
import { DataLayer } from '@Utils/dataLayer';

test.describe('example test', () => {
    test('example description', async ({ page }) => {
        await page.goto('/');
    });
});
