"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import swaggerUi from 'swagger-ui-express';
const routes_1 = __importDefault(require("./routes/routes"));
const http_exception_1 = __importDefault(require("./utils/http-exception"));
require('dotenv').config();
// MIDDLEWARE
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// app.use(express.static('public'));
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});
app.use('src/public', express_1.default.static('public'));
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc))
/* eslint-disable */
app.use((err, req, res, next) => {
    let statusCode = 500; // Default status code for internal server error
    let errorMessage = 'Internal Server Errors';
    console.log(err);
    if (err instanceof http_exception_1.default) {
        statusCode = err.errorCode; // If it's an HttpException, set status code from errorCode property
        errorMessage = err.message; // Set the error message from the HttpException
    }
    res.status(statusCode).json({ error: errorMessage }); // Sending error message along with status code
});
//start the server
app.listen(process.env.PORT || 8000, () => {
    console.log(`server running on ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map