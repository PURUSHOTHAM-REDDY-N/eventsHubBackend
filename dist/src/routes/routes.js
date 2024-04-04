"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const events_controller_1 = __importDefault(require("../controllers/events.controller"));
const api = (0, express_1.Router)()
    .use(auth_controller_1.default)
    .use(events_controller_1.default)
    .use(image_controller_1.default);
exports.default = (0, express_1.Router)().use('/', api);
//# sourceMappingURL=routes.js.map