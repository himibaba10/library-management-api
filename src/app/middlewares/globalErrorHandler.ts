import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
    success: false,
    error,
  });
};

export default globalErrorHandler;
