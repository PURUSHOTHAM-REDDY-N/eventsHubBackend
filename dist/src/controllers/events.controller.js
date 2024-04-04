"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../Middilewares/auth.middleware"));
const events_service_1 = require("../services/events.service");
const router = (0, express_1.Router)();
router.post("/events/createEvent", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const event = yield (0, events_service_1.createEvent)(req.body);
        res.json(event);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/events/createEventTicket", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, events_service_1.createEventTicket)(req.body);
        res.json(event);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/events/getAllEventByUserAccount", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, events_service_1.getAllEventByUserAccount)(req.body.user.id);
        res.json(events);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/events/getAllEvents", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, events_service_1.getAllEvents)();
        res.json(events);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=events.controller.js.map