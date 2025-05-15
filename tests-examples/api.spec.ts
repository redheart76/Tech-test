import { test, expect, request } from '@playwright/test';

test.describe('API 7: Verify Login', () => {
  const baseUrl = 'https://automationexercise.com';
  const email = 'redheart76+2@gmail.com'; // Replace with a real user email
  const password = 'D3v3nv1r0m3nt';      // Use the correct password for the environment

  test('should verify login with valid details', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${baseUrl}/api/verifyLogin`, {
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
});