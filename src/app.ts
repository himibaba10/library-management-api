import dotenv from "dotenv";
dotenv.config();

import express from "express";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import initiateMiddlewares from "./app/middlewares";
import initiateRoutes from "./app/routes";
import startServer from "./server";

const app = express();

// Middlewares
initiateMiddlewares(app);

// Routes
initiateRoutes(app);

app.get("/", (_req, res) => {
  res.send("Hello From Book Management system!");
  return;
});

// Not found handler
app.use("*", notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

startServer(app);
