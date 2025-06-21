"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const notFoundHandler_1 = __importDefault(require("./app/middlewares/notFoundHandler"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const middlewares_1 = __importDefault(require("./app/middlewares"));
const routes_1 = __importDefault(require("./app/routes"));
const server_1 = __importDefault(require("./server"));
const app = (0, express_1.default)();
// Middlewares
(0, middlewares_1.default)(app);
// Routes
(0, routes_1.default)(app);
app.get("/", (_req, res) => {
    res.send("Hello From Book Management system!");
    return;
});
// Not found handler
app.use("*", notFoundHandler_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
(0, server_1.default)(app).catch((err) => {
    console.log("Failed to start server");
    console.error(err);
    console.error(err.message);
    process.exit(1);
});
