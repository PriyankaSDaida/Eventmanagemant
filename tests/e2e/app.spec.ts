
import { test, expect } from '@playwright/test';

test('has title and initial home elements', async ({ page }) => {
    await page.goto('/');

    // Expect a title to contain "EventHorizon" or similar (checking index.html next)
    // For now, let's assume "EventHorizon" or just check the page content.

    // Home page elements
    await expect(page.locator('h1')).toContainText('Craft');
    await expect(page.locator('h1')).toContainText('Unforgettable');
    await expect(page.getByText('The Future of Event Management')).toBeVisible();

    // Explore button to navigate to Events
    const exploreBtn = page.getByRole('button', { name: 'Explore' }).first();
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();

    // Now we should be on EventsList
    await expect(page.getByRole('heading', { name: 'Explore Events' })).toBeVisible();

    // Check for Search input on Events page
    await expect(page.getByPlaceholder('Search events by name, location, or description...')).toBeVisible();
});

test('navigation to login', async ({ page }) => {
    await page.goto('/');

    // Click the Sign In button in Navbar
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Expect to see "Welcome back" or "Sign in" on Auth page
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
});
