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
exports.getAllEvents = exports.getAllEventByUserAccount = exports.createEventTicket = exports.createEvent = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma-client"));
const createEvent = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_client_1.default.event.create({
        data: {
            title: input.title,
            description: input.description,
            start_date: input.start_date,
            start_time: input.start_time,
            end_time: input.end_time,
            event_type: input.event_type,
            event_location_type: input.event_location_type,
            event_location: input.event_location,
            creator_id: input.user.id,
            image: input.image,
        },
        select: {
            event_id: true
        },
    });
    return event;
});
exports.createEvent = createEvent;
const createEventTicket = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const eventTicket = yield prisma_client_1.default.eventTicket.create({
        data: {
            ticket_name: input.ticket_name,
            ticket_type: input.ticket_type,
            ticket_price: input.ticket_price,
            available_quantity: input.total_quantity,
            total_quantity: input.total_quantity,
            event_id: input.event_id
        },
        select: {
            ticket_id: true
        },
    });
    const event = yield prisma_client_1.default.event.update({
        where: {
            event_id: input.event_id,
        },
        data: {
            event_status: "CREATED"
        }
    });
    console.log(event);
    return eventTicket;
});
exports.createEventTicket = createEventTicket;
const getAllEventByUserAccount = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield prisma_client_1.default.event.findMany({
        where: {
            creator_id: input,
        },
    });
    console.log(events);
    return events;
});
exports.getAllEventByUserAccount = getAllEventByUserAccount;
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield prisma_client_1.default.event.findMany();
    return events;
});
exports.getAllEvents = getAllEvents;
//# sourceMappingURL=events.service.js.map