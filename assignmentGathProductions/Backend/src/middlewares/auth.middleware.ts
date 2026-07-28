import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import type { TokenPayload } from '../utils/token.js';

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Missing or invalid authorization header');
    }

    const decoded = jwt.verify(token, config.jwtAccessSecret) as TokenPayload;

    req.user = decoded;

    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired access token'));
  }
};
