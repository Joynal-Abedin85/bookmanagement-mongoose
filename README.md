# 📚 Library Management System

A simple Library Management System built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## 🚀 Features
- Add, view, update, and delete books
- Borrow books with stock checking
- Automatic availability update when stock is empty
- Borrow summary using MongoDB Aggregation Pipeline
- Filtering, sorting, and pagination for books
- Schema validation & business logic enforcement
- Mongoose static/instance methods & middleware

---

## ⚙️ Setup


## Create .env file

PORT=5000
DATABASE_URL=mongodb://localhost:27017/libraryDB
3️⃣ Run the server

# Development
npm run dev

# Production
npm run build
npm start

# Server will run at:

http://localhost:5000

📌 API Endpoints
Books
1. Create Book
POST /api/books

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
2. Get All Books (with filtering/sorting)
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5

3. Get Book by ID
GET /api/books/:bookId

4. Update Book
PUT /api/books/:bookId

{
  "copies": 10
}
5. Delete Book
DELETE /api/books/:bookId

Borrow
6. Borrow a Book
POST /api/borrow

{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}


7. Borrowed Books Summary (Aggregation)
GET /api/borrow

Response:


[
  {
    "book": { "title": "The Theory of Everything", "isbn": "9780553380163" },
    "totalQuantity": 5
  }
]
🛠 Testing
Use Postman to test APIs

Use MongoDB Compass to see database changes

