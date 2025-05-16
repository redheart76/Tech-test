import { Then, When } from "@cucumber/cucumber";
import { expect, request } from "playwright/test";
import { ICustomWorld } from "../../support/custom-world";
import { env } from "process";

When('I send a POST request to the login endpoint to verify the new account', async function (this: ICustomWorld) {
  const baseUrl = 'https://automationexercise.com';
  const password: string = env.PASS || '';
  const email = this.userData?.email; // User's email from the previous step

if (!email) throw new Error('No user email found in world object');
  const apiContext = await request.newContext();
  const response = await apiContext.post(`${baseUrl}/api/verifyLogin`, {
    form: { email, password },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  // Store response and body on the world object for later assertions
  this.apiResponse = response;
  this.apiResponseBody = await response.json();
});

Then('I should receive a correct response', async function (this: ICustomWorld) {
  const page = this.getPage();
  // Check the body for the real status
  expect(this.apiResponse.status()).toBe(200);
  expect(this.apiResponseBody.responseCode).toBe(200);
  expect(this.apiResponseBody.message).toBe('User exists!');
});

When('I send a POST request to the login endpoint to verify login with invalid details', async function (this: ICustomWorld) {
  const baseUrl = 'https://automationexercise.com';
 // invalid email and password
  const invalidEmail = 'abc@abc.com'; 
  const invalidPassword = '12345678';      

   const apiContext = await request.newContext();

    const response = await apiContext.post(`${baseUrl}/api/verifyLogin`, {
      form: {
        email: invalidEmail,
        password: invalidPassword,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
 // Store response and body on the world object for later assertions
    this.apiResponse = response;
    this.apiResponseBody = await response.json();
});

Then('I should receive an error response', async function (this: ICustomWorld) {
 // Check the body for the real status
  expect(this.apiResponse.status()).toBe(200);
  expect(this.apiResponseBody.responseCode).toBe(404);
  expect(this.apiResponseBody.message).toBe('User not found!');
});

When('I send a POST request to the login endpoint to verify login without email', async function (this: ICustomWorld) {
  const baseUrl = 'https://automationexercise.com';
 // invalid email and password
  const invalidPassword = '12345678';      

   const apiContext = await request.newContext();

    const response = await apiContext.post(`${baseUrl}/api/verifyLogin`, {
      form: {
        
        password: invalidPassword,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
 // Store response and body on the world object for later assertions
    this.apiResponse = response;
    this.apiResponseBody = await response.json();
});

Then('I should receive a response says email is missing', async function (this: ICustomWorld) {
 // Check the body for the real status
  expect(this.apiResponse.status()).toBe(200);
  expect(this.apiResponseBody.responseCode).toBe(400);
  expect(this.apiResponseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
});

When('I send a DELETE request to the login endpoint to verify login', async function (this: ICustomWorld) {
  const baseUrl = 'https://automationexercise.com';
  const password: string = env.PASS || '';
  const email = this.userData?.email; // User's email from the previous step

if (!email) throw new Error('No user email found in world object');
  const apiContext = await request.newContext();
  const response = await apiContext.delete(`${baseUrl}/api/verifyLogin`, {
    form: { email, password },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  // Store response and body on the world object for later assertions
  this.apiResponse = response;
  this.apiResponseBody = await response.json();
});

Then('I should receive a response says method not supported', async function (this: ICustomWorld) {
 // Check the body for the real status
  expect(this.apiResponse.status()).toBe(200);
  expect(this.apiResponseBody.responseCode).toBe(405);
  expect(this.apiResponseBody.message).toBe('This request method is not supported.');
});