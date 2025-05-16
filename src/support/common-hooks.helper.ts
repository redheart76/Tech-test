import { ICustomWorld } from './custom-world';
import { Page } from 'playwright';
import { env } from 'process';

/**
 * Reads the environment config and assigns the value to the global CustomWorld as the environmentConfig property
 * Returns the file name to store session state against
 * @param world
 * @param workerId
 * @returns environment session storage file name
 */
export const configureEnvironment = async (
  world: ICustomWorld,
  workerId: number,
): Promise<string> => {
  const allowedEnvironments = [
    'DEV',
    'TEST',
  ];
  // Determine which environment we're running against, if it's dve/test. Default to dev if nothing is provided
  const environment = world.parameters?.environment?.toLowerCase() ?? 'dev';
  const validEnv = allowedEnvironments.some((element) => element.toLowerCase() === environment);
  if (!validEnv) {
    // eslint-disable-next-line no-console
    console.log(`The environment variable you passed (${environment}) is not allowed`);
    throw 'Invalid environment specified';
  }
  // Load config file based on environment provided
  const environmentConfig = await import(`../config/config-${environment}`);
  world.environmentConfig = environmentConfig;
  // We prefix the storage state with environment, so that we don't use a test saved state on peek etc
  return `storageStates/${environment}-storageState${workerId}.json`;
};


/**
 * Steps to manually login, for the first time login or when the stored state is no longer valid
 * @param page
 * @param emailAddress
 */
export const manualLoginSteps = async (page: Page, emailAddress: string): Promise<void> => {
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await page.getByText('login').click();
  const password: string = env.PASS || '';
  const emailField = '[data-qa=login-email]';
  const passwordField = '[data-qa=login-password]';
  const submitButton = '[data-qa-id=login-button]';
  await page.locator(emailField).fill(emailAddress);
  await page.locator(passwordField).fill(password);
  await page.locator(submitButton).click();
};
