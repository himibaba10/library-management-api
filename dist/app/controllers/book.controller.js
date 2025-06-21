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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBook = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.default.create(Object.assign(Object.assign({}, req.body), { copies: Math.round(req.body.copies) }));
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Filtering
        let filter;
        const genre = req.query.filter;
        if (genre &&
            (genre === "FICTION" ||
                genre === "NON_FICTION" ||
                genre === "SCIENCE" ||
                genre === "HISTORY" ||
                genre === "BIOGRAPHY" ||
                genre === "FANTASY")) {
            filter = genre;
        }
        const query = {};
        if (filter)
            query.genre = filter;
        // Sorting
        let sortBy = "copies";
        if (req.query.sortBy) {
            sortBy = String(req.query.sortBy);
        }
        let sort = {};
        if (req.query.sort &&
            (req.query.sort === "desc" || req.query.sort === "asc")) {
            sort[sortBy] = req.query.sort === "desc" ? -1 : 1;
        }
        // Limiting
        let limit = 10;
        if (req.query.limit && !isNaN(Number(req.query.limit))) {
            limit = parseInt(req.query.limit);
        }
        const books = yield book_model_1.default.find(query).sort(sort).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBooks = getBooks;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.default.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBook = getBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updated = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updated,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deleted = yield book_model_1.default.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
const bookControllers = {
    createBook: exports.createBook,
    getBooks: exports.getBooks,
    getBook: exports.getBook,
    updateBook: exports.updateBook,
    deleteBook: exports.deleteBook,
};
exports.default = bookControllers;
