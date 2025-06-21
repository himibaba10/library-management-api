import { Schema, model } from "mongoose";
import { TBorrowBook } from "../interfaces/borrow.interface";

const borrowBookSchema = new Schema<TBorrowBook>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Minimum value must be one"],
    },
    dueDate: { type: Date, required: true, cast: "Only Date is acceptable" },
  },
  {
    timestamps: true,
  }
);

const BorrowBook = model<TBorrowBook>("BorrowBook", borrowBookSchema);

export default BorrowBook;
