import { Request, Response, NextFunction } from "express";

// Define a custom error type, if needed
interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

const errorMiddleware = (
  err: CustomError, // Explicitly define the type for 'err'
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If the error has a custom status code, use it, otherwise default to 500
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorMiddleware;
