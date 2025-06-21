import { Router } from "express";
import bookControllers from "../controllers/book.controller";

const bookRouter = Router();

// GET
bookRouter.get("/", bookControllers.getBooks);
bookRouter.get("/:bookId", bookControllers.getBook);

// POST
bookRouter.post("/", bookControllers.createBook);

// PUT
bookRouter.put("/:bookId", bookControllers.updateBook);

// DELETE
bookRouter.delete("/:bookId", bookControllers.deleteBook);

export default bookRouter;
