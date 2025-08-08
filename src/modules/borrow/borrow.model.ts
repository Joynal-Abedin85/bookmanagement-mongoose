import { Schema, model, Document } from "mongoose";
import { Book, IBook } from "../book/book.model";
// import { IBook, Book } from "./book.model"; // book.model থেকে ইম্পোর্ট

export interface IBorrow extends Document {
  book: IBook["_id"];
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"]
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"]
    }
  },
  { timestamps: true }
);

/**
 * Static method → Borrow a book
 * Handles business logic: check copies, update copies & availability
 */
borrowSchema.statics.borrowBook = async function (bookId: string, quantity: number, dueDate: Date) {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  // Update copies & availability
  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();

  // Create borrow record
  const borrowRecord = await this.create({ book: bookId, quantity, dueDate });
  return borrowRecord;
};

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
