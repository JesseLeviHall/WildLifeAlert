"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const homeRoute_1 = require("./homeRoute");
const otherRoute_1 = require("./otherRoute");
exports.api = (0, express_1.Router)();
exports.api.use("/", homeRoute_1.homeRouter);
exports.api.use('/', otherRoute_1.otherRouter);
//# sourceMappingURL=api.js.map