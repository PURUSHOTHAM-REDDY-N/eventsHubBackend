"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("../docs/swagger.json"));
var routes_1 = __importDefault(require("./routes/routes"));
var http_exception_1 = __importDefault(require("./utils/http-exception"));
require('dotenv').config();
// MIDDLEWARE
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// app.use(express.static('public'));
app.get('/', function (req, res) {
    res.json({ status: 'API is running' });
});
app.use('src/public', express_1.default.static('public'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
/* eslint-disable */
app.use(function (err, req, res, next) {
    var statusCode = 500; // Default status code for internal server error
    var errorMessage = 'Internal Server Errors';
    console.log(err);
    if (err instanceof http_exception_1.default) {
        statusCode = err.errorCode; // If it's an HttpException, set status code from errorCode property
        errorMessage = err.message; // Set the error message from the HttpException
    }
    res.status(statusCode).json({ error: errorMessage }); // Sending error message along with status code
});
//start the server
app.listen(process.env.PORT || 8000, function () {
    console.log("server running on ".concat(process.env.PORT));
});
