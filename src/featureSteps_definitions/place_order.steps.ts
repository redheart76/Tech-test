import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { manualLoginSteps, newUsers, paymentCardDetails, userDetails } from '../support/common-hooks.helper';
import { time } from 'console';



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
  await newUsers(page, 'Test User', 'redheart76+2@gmail.com');
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
  // Verify that the user is logged in
  // await expect(page.locator('[class="fa fa-user"]')).toHaveText(' Logged in as Test User', { timeout: 10000 });
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
      await page.locator('[class="cart_total_price"]').nth(1).waitFor({ state: 'visible' });
   const productText = await page.locator('[class="cart_total_price"]').nth(1).textContent();
   console.log('Product text:', productText);
   // Review the order

  //  expect(page.locator('product-1')).toContainText('Blue Top') // Verify product name
  //  expect(page.locator('[class="cart_total_price"]')).toHaveText('Rs. 500') // Verify product price

  // Todo: add a comment in the field

  await page.locator('[class="btn btn-default check_out"]').click();

});

When('I complete the payment details', async function (this: ICustomWorld) {
  const page = this.getPage();
  await paymentCardDetails(page);
   

});