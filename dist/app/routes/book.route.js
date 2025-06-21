"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = __importDefault(require("../controllers/book.controller"));
const bookRouter = (0, express_1.Router)();
// GET
bookRouter.get("/", book_controller_1.default.getBooks);
bookRouter.get("/:bookId", book_controller_1.default.getBook);
// POST
bookRouter.post("/", book_controller_1.default.createBook);
// PUT
bookRouter.put("/:bookId", book_controller_1.default.updateBook);
// DELETE
bookRouter.delete("/:bookId", book_controller_1.default.deleteBook);
exports.default = bookRouter;
