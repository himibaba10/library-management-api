"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_route_1 = __importDefault(require("./book.route"));
const borrow_route_1 = __importDefault(require("./borrow.route"));
const initiateRoutes = (app) => {
    app.use("/api/books", book_route_1.default);
    app.use("/api/borrow", borrow_route_1.default);
};
exports.default = initiateRoutes;
