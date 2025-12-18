
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('should allow user to sign up', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign In' }).click();

        // Switch to Sign Up
        await page.getByRole('button', { name: 'Sign up' }).click();

        // Fill form
        await page.getByPlaceholder('Full Name').fill('Test User');
        await page.getByPlaceholder('Email address').fill(`test${Date.now()}@example.com`);
        await page.getByPlaceholder('Password').fill('password123');

        // Submit
        await page.getByRole('button', { name: 'Sign up' }).click();

        // Verify redirect to Dashboard or Home with user logged in
        // App.tsx redirects to DASHBOARD on login
        await expect(page.getByText('Test User')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    });

    test('should allow user to login', async ({ page }) => {
        // Assuming a user exists or we create one first. 
        // Since mock data might not persist across test runs defined by 'test' isolation (if valid), 
        // it's safer to Sign Up first or use a known seed if available.
        // But for now, let's Sign Up then Logout then Login to be safe.

        await page.goto('/');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.getByRole('button', { name: 'Sign up' }).click();
        const email = `login${Date.now()}@example.com`;
        await page.getByPlaceholder('Full Name').fill('Login User');
        await page.getByPlaceholder('Email address').fill(email);
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Sign up' }).click();

        // Logout
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

        // Login
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.getByPlaceholder('Email address').fill(email);
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Sign in' }).click();

        // Check for Dashboard Overview which appears only after login
        await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible();
    });
});
