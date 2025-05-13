import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../src/support/custom-world';

Given('I have added a product to my cart', async function (this: ICustomWorld) {

    
});


When('I begin sign in with Intuit', async function (this: ICustomWorld) {
  const page = this.getPage();
//   const intuitSignInBtn = await getElementByDTI(page, 'intuit-login__a-sign-in');
//   await intuitSignInBtn.click();
});

Then('I should be taken to the Intuit login page', async function (this: ICustomWorld) {
  const page = this.getPage();
  await expect(page).toHaveURL(new RegExp('^https://accounts.intuit.com'));
});
