import { AuthService } from '../services/Auth.service.js';
import { ApiError } from '../utils/ApiError.js';
export class AuthController {
    static signup = async (req, res, next) => {
        try {
            const result = await AuthService.signup(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    };
    static login = async (req, res, next) => {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    };
    static logout = async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return next(new ApiError(401, 'Unauthorized'));
            }
            await AuthService.logout(userId);
            res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            });
        }
        catch (error) {
            next(error);
        }
    };
    static refresh = async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.refreshAccessToken(refreshToken);
            res.status(200).json({
                success: true,
                message: 'Access token refreshed successfully',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    };
    static getCurrentUser = async (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                return next(new ApiError(401, 'Unauthorized'));
            }
            res.status(200).json({
                success: true,
                user,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=Auth.controller.js.map