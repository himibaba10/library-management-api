import { Application } from "express";
import bookRouter from "./book.route";
import borrowRouter from "./borrow.route";

const initiateRoutes = (app: Application) => {
  app.use("/api/books", bookRouter);
  app.use("/api/borrow", borrowRouter);
};

export default initiateRoutes;
