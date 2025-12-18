
import { test, expect } from '@playwright/test';

test.describe('Event Management', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Switch to Sign Up to ensure we have a fresh user or just use a unique Login
        // For simplicity/speed in this mock env, Sign Up is easier than handling "User not found"
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.getByPlaceholder('Full Name').fill('Event Host');
        await page.getByPlaceholder('Email address').fill(`host${Date.now()}@example.com`);
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Sign up' }).click();

        // Wait for login to complete (Dashboard view)
        await expect(page.getByRole('button', { name: 'Host Event' })).toBeVisible();
    });

    test('should create a new event', async ({ page }) => {
        // Navigate to Create Event
        await page.getByRole('button', { name: 'Host Event' }).first().click();

        // Step 1
        await expect(page.getByText('Event Details')).toBeVisible();
        await page.getByPlaceholder('e.g., Future Tech Summit 2025').fill('Playwright Test Event');

        // Fill datetime - Playwright fills datetime-local nicely
        await page.locator('input[type="datetime-local"]').fill('2025-12-25T14:00');

        await page.getByPlaceholder('Venue or Online Link').fill('Virtual Link');

        await page.getByRole('button', { name: 'Next Step' }).click();

        // Step 2
        await expect(page.getByText('Content & AI Magic')).toBeVisible();
        await page.getByPlaceholder('Tell us about the event...').fill('This is an automated test event description.');

        await page.getByRole('button', { name: 'Next Step' }).click();

        // Step 3
        await expect(page.getByRole('heading', { name: /Tickets & Review/i })).toBeVisible();
        // Default ticket should be there
        await expect(page.locator('input[value="General Admission"]')).toBeVisible();

        await page.getByRole('button', { name: 'Publish Event' }).click();

        // Verify we are back to Events list or similar, and see the new event
        // App.tsx redirects to EVENTS after create
        await expect(page.getByRole('heading', { name: 'Explore Events' })).toBeVisible();

        // Search for it to be sure
        await page.getByPlaceholder('Search events by name, location, or description...').fill('Playwright Test Event');
        await expect(page.getByText('Playwright Test Event')).toBeVisible();
    });
});
