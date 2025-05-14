"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserOptions = void 0;
const playwright_1 = require("playwright");
playwright_1.selectors.setTestIdAttribute('data-qa');
exports.browserOptions = {
    slowMo: 0,
    headless: false,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
};
