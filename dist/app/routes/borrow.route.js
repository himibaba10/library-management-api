"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = __importDefault(require("../controllers/borrow.controller"));
const borrowRouter = (0, express_1.Router)();
// GET
borrowRouter.get("/", borrow_controller_1.default.borrowedBooksSummary);
// POST
borrowRouter.post("/", borrow_controller_1.default.borrowBook);
exports.default = borrowRouter;
