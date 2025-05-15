import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { manualLoginSteps, newUsers, paymentCardDetails, userDetails } from '../support/common-hooks.helper';
import { time } from 'console';
import { generateUserData } from '../support/test_data';



Given('I am on the homepage', async function (this: ICustomWorld) {
    const page = this.getPage();
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL('https://automationexercise.com/');
});


When('I click on the "Sign Up" button', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
});

When('I fill in the registration form with valid details', async function (this: ICustomWorld) {
  const page = this.getPage();
  const userData = generateUserData();
  this.userData = userData;
  await newUsers(page, `${userData.name}`, `${userData.email}`);
  await page.locator('[data-qa=signup-button]').click();
  await page.waitForLoadState('load')
  await userDetails(page);
  
});

Then('I should be able to create a new account', async function (this: ICustomWorld) {
  const page = this.getPage();
  await expect(page.locator('[data-qa=account-created]')).toHaveText('Account Created!');
});


Then('I am able to contiune to use the account', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.locator('[data-qa=continue-button]').click();
  await page.locator('[class="fa fa-user"]').waitFor({ state: 'visible' });
  const userName = this.userData?.name;
  // Verify that the user is logged in
  await expect(page.locator('[class="nav navbar-nav"]')).toContainText(`Logged in as ${userName}`, { timeout: 10000 });
});

When('I add a product to the cart', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.locator('[class="btn btn-default add-to-cart"]').first().click()
  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page).toHaveURL('https://automationexercise.com/view_cart');
});

When('I proceed to checkout', async function (this: ICustomWorld) {
  const page = this.getPage();
   await page.locator('[class="btn btn-default check_out"]').click();
   // Verify delivery address
   expect(page.locator('#address_delivery')).not.toBeNull()
   // Review the order
   expect(page.locator('[class="cart_description"]')).toContainText('Blue Top')
   expect(page.locator('[class="cart_total"]')).toHaveText('Rs. 500')
   await page.locator('[class="form-control"]').fill('My comment');
   await page.locator('[class="btn btn-default check_out"]').click();
});

When('I complete the payment details', async function (this: ICustomWorld) {
  const page = this.getPage();
  await paymentCardDetails(page);
});

When('I review the cart', async function (this: ICustomWorld) {
  const page = this.getPage();
  await page.getByRole('link', { name: ' Cart' }).click();
});
