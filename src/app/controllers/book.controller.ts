import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";
import { TGenre } from "../interfaces/book.interface";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.create({
      ...req.body,
      copies: Math.round(req.body.copies),
    });
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Filtering
    let filter: TGenre | undefined;
    const genre = req.query.filter;
    if (
      genre &&
      (genre === "FICTION" ||
        genre === "NON_FICTION" ||
        genre === "SCIENCE" ||
        genre === "HISTORY" ||
        genre === "BIOGRAPHY" ||
        genre === "FANTASY")
    ) {
      filter = genre as TGenre;
    }
    const query: any = {};
    if (filter) query.genre = filter;

    // Sorting
    let sortBy = "copies";
    if (req.query.sortBy) {
      sortBy = String(req.query.sortBy);
    }
    let sort: Record<string, -1 | 1> = {};
    if (
      req.query.sort &&
      (req.query.sort === "desc" || req.query.sort === "asc")
    ) {
      sort[sortBy] = req.query.sort === "desc" ? -1 : 1;
    }

    // Limiting
    let limit = 10;
    if (req.query.limit && !isNaN(Number(req.query.limit))) {
      limit = parseInt(req.query.limit as string);
    }

    const books = await Book.find(query).sort(sort).limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const updated = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const bookControllers = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};

export default bookControllers;
