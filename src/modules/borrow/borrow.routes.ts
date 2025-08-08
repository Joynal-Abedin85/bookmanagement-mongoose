import express from "express";
import { borrowBook, getBorrowSummary } from "./borrow.controller";

const borrowrouter = express.Router();

borrowrouter.post("/", borrowBook);      // POST /api/borrow
borrowrouter.get("/", getBorrowSummary); // GET /api/borrow

export default borrowrouter;
