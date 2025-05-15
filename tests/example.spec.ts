import { test, expect, request } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

const baseUrl = 'https://automationexercise.com';
const email = 'redheart76+2@gmail.com'; // Replace with a real user email
const password = 'D3v3nv1r0m3nt';      // Use the correct password for the environment

test('should verify login with valid details', async ({ request }) => {
  const response = await request.post(`${baseUrl}/api/verifyLogin`, {
    form: {
      email,
      password,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toBe('User exists!');
});

// ...existing code...

test('should return 404 for login with invalid details', async ({ request }) => {
  const response = await request.post(`${baseUrl}/api/verifyLogin`, {
    form: {
      email: 'invaliduser@example.com',
      password: 'wrongpassword',
    },
    // No need to set headers, Playwright handles it
  });

  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body.message).toBe('User not found!');
});
// ...existing code...

test('should return 405 for unsupported DELETE method on verifyLogin', async ({ request }) => {
  const response = await request.delete(`${baseUrl}/api/verifyLogin`);
  expect(response.status()).toBe(405);
  const body = await response.json();
  expect(body.message).toBe('This request method is not supported.');
});

test('should return 400 when email parameter is missing', async ({ request }) => {
  const response = await request.post(`${baseUrl}/api/verifyLogin`, {
    form: {
      password, // Only password, no email
    },
    // No need to set headers, Playwright handles it
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
});