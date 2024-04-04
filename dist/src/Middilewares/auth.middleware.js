"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function auth(req, res, next) {
    var _a;
    console.log("before token extraction", req);
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log(token);
    if (token) {
        try {
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
            Object.assign(req.body, { user: decoded });
            next();
        }
        catch (error) {
            // Token verification failed, send a 401 Unauthorized response
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}
exports.default = auth;
