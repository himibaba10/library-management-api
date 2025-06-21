"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        cast: "Only string is accepted.",
    },
    author: {
        type: String,
        required: true,
        trim: true,
        cast: "Only string is accepted.",
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "The value '{VALUE}' is not acceptable",
        },
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        cast: "Only string is accepted.",
    },
    description: { type: String, cast: "Only string is accepted." },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies can't be negative"],
        cast: "Only positive number is accepted.",
    },
    available: {
        type: Boolean,
        default: true,
        cast: "Only boolean value is accepted. {VALUE} is not boolean.",
    },
}, {
    timestamps: true,
});
// Method
bookSchema.methods.updateAvailability = function (quantity) {
    this.copies -= quantity;
    this.available = this.copies > 0;
};
// Middlware
bookSchema.pre(["findOne", "findOneAndUpdate", "findOneAndDelete"], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = this.getQuery()._id;
        if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
            const error = new Error("Invalid Book ID");
            error.name = "InvalidIdError";
            error.errors = {
                common: {
                    message: "Invalid Book ID",
                },
            };
            return next(error);
        }
        let book = yield this.model.countDocuments({ _id: id });
        if (!book) {
            const error = new Error("Book not found");
            error.name = "NotFoundError";
            error.errors = {
                common: {
                    message: "Book not found",
                },
            };
            return next(error);
        }
        next();
    });
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
