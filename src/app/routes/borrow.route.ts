import { Router } from "express";
import borrowControllers from "../controllers/borrow.controller";

const borrowRouter = Router();

// GET
borrowRouter.get("/", borrowControllers.borrowedBooksSummary);

// POST
borrowRouter.post("/", borrowControllers.borrowBook);

export default borrowRouter;
