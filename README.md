# Library Management API

Library management API consists of CRUD operations of books and borrowing the books.

## Features

- Create books
- Get all books
- Get a book by Id
- Update a book by Id
- Delete a book by Id
- Borrow books
- Analysis of the borrowed books

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/himibaba10/library-management-api.git
   cd library-management-api
   ```


2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and define the following environment variable:

   ```
   PORT=ANY_PORT (i.e, 3000)
   DB_URL=MONGODB_URL
   ```

4. Start the server:

   ```bash
   npm start
   npm run start:dev (with nodemon)
   ```

   By default, the server will run on `http://localhost:3000`.

## Models

We have two models: Book, BorrowBook

### `Book`
 - **title** (string)
 - **author** (string)
 - **genre** (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
 - **isbn** (string)
 - **description?** (string)
 - **copies** (number)
 - **available?** (boolean)

### `BorrowBook`
 - **book** (objectId)
 - **quantity** (number)
 - **dueDate** (Date)

## Routes

The server provides the following routes:

### `/`

- **Method**: GET
- **Description**: Returns "Hello From Book Management system!" as a basic example of a route.

### `/api/books`

- **Method**: POST
- **Description**: Create a book to the database

### `/api/books`

- **Method**: GET
- **Description**: Get all books from the database

### `/api/books/bookId`

- **Method**: GET
- **Description**: Get a book by mongodb ObjectId from the database

### `/api/books/bookId`

- **Method**: PUT
- **Description**: Update a book by mongodb ObjectId from the database

### `/api/books/bookId`

- **Method**: DELETE
- **Description**: Delete a book by mongodb ObjectId from the database

### `/api/borrow`

- **Method**: POST
- **Description**: Borrow a book from the books collections

### `/api/borrow`

- **Method**: GET
- **Description**: Get detailed summary of borrowed books


### Catch Unavailable Routes (`*`)

- **Description**: Catches any undefined routes and returns a json object with "Route not found" and other error values.

## Dependencies
- **express**: Web framework for Node.js.
- **mongoose**: Connects MongoDB database and provides Schema with other features.
- **cors**: CORS ensures that if frontend requests for the data, the data will be sent without issues.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.

---

### Author

- [Ferdous Ahmed](https://github.com/himibaba10)