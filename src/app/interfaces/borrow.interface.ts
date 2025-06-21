import { Types } from "mongoose";

export type TBorrowBook = {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
};
