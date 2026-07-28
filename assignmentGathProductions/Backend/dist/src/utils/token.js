import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '15m' });
};
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '7d' });
};
//# sourceMappingURL=token.js.map