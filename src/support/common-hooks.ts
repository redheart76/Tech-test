import { browserOptions } from './config';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout, ITestCaseHookParameter } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
} from 'playwright';
import 'dotenv/config';
import fsExtra from 'fs-extra';
import { ICustomWorld } from './custom-world';
import dayjs from 'dayjs';


let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';

declare global {
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (process.env.BROWSER) {
    case 'firefox':
      browser = await firefox.launch(browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(browserOptions);
      break;
    default:
      browser = await chromium.launch(browserOptions);
  }
  await fsExtra.ensureDir(tracesDir);
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  const time = new Date().toISOString().split('.')[0];
  this.testName = pickle.name.replace(/\W/g, '-') + '-' + time.replace(/:|T/g, '-');
  this.feature = pickle;

  // Initialize browser context and page
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: `./videos/${this.testName}` } : undefined,
    viewport: { width: 1280, height: 1440 },
  });

  this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(
      `Status: ${result?.status}. Duration:${result.duration?.seconds}s.
End-Time: ${dayjs().toDate()}`,
    );
    const environment = this.parameters?.environment?.toLowerCase() ?? 'test';
    const environmentJson = {
      environment: environment,
    };
    this.attach(JSON.stringify(environmentJson), 'application/json');

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot({ timeout: 60000 });
      if (image) {
        this.attach(image, 'image/png');
      }
      await this.context?.tracing.stop({ path: `${tracesDir}/${this.testName}-trace.zip` });
    }
  }

  await this.page?.close();
  await this.context?.close();

  if (process.env.PWVIDEO && result?.status !== Status.SKIPPED) {
    const workerId = process.env.CUCUMBER_WORKER_ID ? parseInt(process.env.CUCUMBER_WORKER_ID) : 0;
    this.workerId = workerId;

    const statusFolder = result?.status === Status.PASSED ? 'passed' : 'failed';
    const tempPath = `./videos/${this.testName}-${workerId}/.`;
    const finalPath = `./videos/${statusFolder}/${this.testName}-${workerId}/.`;

    try {
      await fsExtra.move(tempPath, finalPath, { overwrite: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error moving video:', error);
    }
  }
});

AfterAll(async function () {
  await browser.close();
});
