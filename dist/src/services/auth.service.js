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
exports.getCurrentUser = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_client_1 = __importDefault(require("../../prisma/prisma-client"));
const token_utils_1 = __importDefault(require("../utils/token.utils"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const email = input.email;
    const username = input.username;
    const password = input.password;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma_client_1.default.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
        select: {
            id: true,
        },
    });
    return user;
});
exports.createUser = createUser;
const login = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const email = input.email.trim();
    const password = input.password.trim();
    const user = yield prisma_client_1.default.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            email: true,
            username: true,
            password: true,
        },
    });
    if (user) {
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (match) {
            return {
                email: user.email,
                username: user.username,
                token: (0, token_utils_1.default)({ id: user.id }),
            };
        }
    }
    return user;
});
exports.login = login;
const getCurrentUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_client_1.default.user.findUnique({
        where: {
            username
        },
        select: {
            email: true,
            username: true,
        }
    });
    return user;
});
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.service.js.map