import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";
import BorrowBook from "../models/borrow.model";

const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const existingBook = await Book.findById(book);

    if (existingBook!.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: null,
      });
      return;
    }

    existingBook!.updateAvailability(quantity);
    await existingBook!.save();

    const borrow = await BorrowBook.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

const borrowedBooksSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: "$totalQuantity",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

const borrowControllers = {
  borrowBook,
  borrowedBooksSummary,
};

export default borrowControllers;
