"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const cucumber_1 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
require("dotenv/config");
const fs_extra_1 = __importDefault(require("fs-extra"));
const dayjs_1 = __importDefault(require("dayjs"));
let browser;
const tracesDir = 'traces';
(0, cucumber_1.setDefaultTimeout)(process.env.PWDEBUG ? -1 : 60 * 1000);
(0, cucumber_1.BeforeAll)(async function () {
    switch (process.env.BROWSER) {
        case 'firefox':
            browser = await playwright_1.firefox.launch(config_1.browserOptions);
            break;
        case 'webkit':
            browser = await playwright_1.webkit.launch(config_1.browserOptions);
            break;
        default:
            browser = await playwright_1.chromium.launch(config_1.browserOptions);
    }
    await fs_extra_1.default.ensureDir(tracesDir);
});
(0, cucumber_1.Before)(async function ({ pickle }) {
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
(0, cucumber_1.After)(async function ({ result }) {
    if (result) {
        this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s.
End-Time: ${(0, dayjs_1.default)().toDate()}`);
        const environment = this.parameters?.environment?.toLowerCase() ?? 'test';
        const environmentJson = {
            environment: environment,
        };
        this.attach(JSON.stringify(environmentJson), 'application/json');
        if (result.status !== cucumber_1.Status.PASSED) {
            const image = await this.page?.screenshot({ timeout: 60000 });
            if (image) {
                this.attach(image, 'image/png');
            }
            await this.context?.tracing.stop({ path: `${tracesDir}/${this.testName}-trace.zip` });
        }
    }
    await this.page?.close();
    await this.context?.close();
    if (process.env.PWVIDEO && result?.status !== cucumber_1.Status.SKIPPED) {
        const workerId = process.env.CUCUMBER_WORKER_ID ? parseInt(process.env.CUCUMBER_WORKER_ID) : 0;
        this.workerId = workerId;
        const statusFolder = result?.status === cucumber_1.Status.PASSED ? 'passed' : 'failed';
        const tempPath = `./videos/${this.testName}-${workerId}/.`;
        const finalPath = `./videos/${statusFolder}/${this.testName}-${workerId}/.`;
        try {
            await fs_extra_1.default.move(tempPath, finalPath, { overwrite: true });
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error moving video:', error);
        }
    }
});
(0, cucumber_1.AfterAll)(async function () {
    await browser.close();
});
