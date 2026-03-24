import { test, expect } from '@playwright/test'

test.describe('Membership signup wizard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('shows wizard on page load', async ({ page }) => {
        await expect(page.getByText('Coding camp summer 2025')).toBeVisible()
        await expect(page.getByText('Step 1 of 3')).toBeVisible()
    })

    test('shows error when next is clicked without selecting member type', async ({ page }) => {
        await page.getByRole('button', { name: 'Next →' }).click()
        await expect(page.getByText('Please select a member type')).toBeVisible()
    })

    test('completes full wizard flow', async ({ page }) => {
        await page.getByText('Active Member').click()
        await page.getByLabel('Active Member').click()
        await page.getByRole('button', { name: 'Next →' }).click()

        await expect(page.getByText('Step 2 of 3')).toBeVisible()
        await page.getByLabel('Full name').fill('Jane Doe')
        await page.getByLabel('Email').fill('jane@example.com')
        await page.getByLabel('Phone number').fill('+47 123 45 678')
        await page.getByLabel('Date of birth').fill('1990-05-20')
        await page.getByRole('button', { name: 'Next →' }).click()

        await expect(page.getByText('Step 3 of 3')).toBeVisible()
        await expect(page.getByText('Jane Doe')).toBeVisible()
        await page.getByRole('button', { name: 'Submit ✓' }).click()

        // Success
        await expect(page.getByText("You're registered!")).toBeVisible()
    })
})