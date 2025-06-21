"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowBookSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Minimum value must be one"],
    },
    dueDate: { type: Date, required: true, cast: "Only Date is acceptable" },
}, {
    timestamps: true,
});
const BorrowBook = (0, mongoose_1.model)("BorrowBook", borrowBookSchema);
exports.default = BorrowBook;
