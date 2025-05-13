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
