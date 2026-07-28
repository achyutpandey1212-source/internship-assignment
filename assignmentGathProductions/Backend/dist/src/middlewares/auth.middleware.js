import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
export const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Missing or invalid authorization header');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new ApiError(401, 'Missing or invalid authorization header');
        }
        const decoded = jwt.verify(token, config.jwtAccessSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new ApiError(401, 'Invalid or expired access token'));
    }
};
//# sourceMappingURL=auth.middleware.js.map