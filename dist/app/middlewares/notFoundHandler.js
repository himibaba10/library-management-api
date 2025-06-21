"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: {
            name: "RouteNotFoundError",
            errors: {
                common: {
                    message: "Route not found",
                },
            },
        },
    });
};
exports.default = notFoundHandler;
