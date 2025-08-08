import express from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import bookrouter from "./modules/book/book.routes";
import borrowrouter from "./modules/borrow/borrow.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookrouter);
app.use("/api/borrow", borrowrouter);


// Root
app.get("/", (req, res) => {
  res.send("Hello World");
});

// MongoDB connection
mongoose
  .connect(config.database_url as string)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => console.error(" DB Connection Error:", err));
