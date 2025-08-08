// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: err.message || 'Something went wrong',
    success: false,
    error: err
  });
};
