"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualLoginSteps = exports.configureEnvironment = void 0;
const process_1 = require("process");
/**
 * Reads the environment config and assigns the value to the global CustomWorld as the environmentConfig property
 * Returns the file name to store session state against
 * @param world
 * @param workerId
 * @returns environment session storage file name
 */
const configureEnvironment = async (world, workerId) => {
    const allowedEnvironments = [
        'DEV',
        'TEST',
    ];
    // Determine which environment we're running against, if it's dve/test. Default to test if nothing is provided
    const environment = world.parameters?.environment?.toLowerCase() ?? 'test';
    const validEnv = allowedEnvironments.some((element) => element.toLowerCase() === environment);
    if (!validEnv) {
        // eslint-disable-next-line no-console
        console.log(`The environment variable you passed (${environment}) is not allowed`);
        throw 'Invalid environment specified';
    }
    // Load config file based on environment provided
    const environmentConfig = await Promise.resolve(`${`../config/config-${environment}`}`).then(s => __importStar(require(s)));
    world.environmentConfig = environmentConfig;
    // We prefix the storage state with environment, so that we don't use a test saved state on peek etc
    return `storageStates/${environment}-storageState${workerId}.json`;
};
exports.configureEnvironment = configureEnvironment;
/**
 * Steps to manually login, for the first time login or when the stored state is no longer valid
 * @param page
 * @param emailAddress
 */
const manualLoginSteps = async (page, emailAddress) => {
    const password = process_1.env.PASS || '';
    const emailField = '[data-qa=login-email]';
    const passwordField = '[data-qa=login-password]';
    const submitButton = '[data-qa-id=login-button]';
    await page.locator(emailField).fill(emailAddress);
    await page.locator(passwordField).fill(password);
    await page.locator(submitButton).click();
};
exports.manualLoginSteps = manualLoginSteps;
