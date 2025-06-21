import { isValidObjectId, Model, model, Query, Schema } from "mongoose";
import { TBook, TBookMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<TBook, Model<TBook>, TBookMethods>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Method
bookSchema.methods.updateAvailability = function (quantity: number) {
  this.copies -= quantity;
  this.available = this.copies > 0;
};

// Middlware
bookSchema.pre(
  ["findOne", "findOneAndUpdate", "findOneAndDelete"],
  async function (next) {
    const id = this.getQuery()._id;

    if (!id || !isValidObjectId(id)) {
      const error = new Error("Invalid Book ID");
      (error as any).name = "InvalidIdError";
      (error as any).errors = {
        common: {
          message: "Invalid Book ID",
        },
      };
      return next(error);
    }

    let book: number = await this.model.countDocuments({ _id: id });

    if (!book) {
      const error = new Error("Book not found");
      (error as any).name = "NotFoundError";
      (error as any).errors = {
        common: {
          message: "Book not found",
        },
      };

      return next(error);
    }

    next();
  }
);

const Book = model("Book", bookSchema);

export default Book;
