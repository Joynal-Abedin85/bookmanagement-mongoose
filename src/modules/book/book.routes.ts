import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "./book.controller";

const bookrouter = Router();

bookrouter.post("/", createBook); // Create Book
bookrouter.get("/", getAllBooks); // Get All Books + filter/sort
bookrouter.get("/:bookId", getBookById); // Get Book By ID
bookrouter.put("/:bookId", updateBook); // Update Book
bookrouter.delete("/:bookId", deleteBook); // Delete Book

export default bookrouter;
