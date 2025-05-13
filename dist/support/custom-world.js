"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
class CustomWorld extends cucumber_1.World {
    constructor(options) {
        super(options);
        this.debug = false;
        this.page = undefined;
        this.context = undefined;
    }
    getPage() {
        if (!this.page) {
            throw 'Page cannot be undefined';
        }
        return this.page;
    }
}
exports.CustomWorld = CustomWorld;
(0, cucumber_1.setWorldConstructor)(CustomWorld);
