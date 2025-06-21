"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (error, _req, res, _next) => {
    res.status(error.status || 500).json({
        message: error.message || "Internal Server Error",
        success: false,
        error,
    });
};
exports.default = globalErrorHandler;
