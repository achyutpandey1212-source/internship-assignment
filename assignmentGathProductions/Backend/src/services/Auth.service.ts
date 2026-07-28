import UserModel from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { ApiError } from '../utils/ApiError.js';
import type { TokenPayload } from '../utils/token.js';
import type { SignupDTO, LoginDTO, AuthResponse, UserResponse } from '../types/auth.types.js';

export class AuthService {
  static async signup(signupDTO: SignupDTO): Promise<AuthResponse> {
    const { name, email, password } = signupDTO;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userResponse: UserResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  static async login(loginDTO: LoginDTO): Promise<AuthResponse> {
    const { email, password } = loginDTO;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userResponse: UserResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }

  static async logout(userId: string): Promise<string> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    return 'Logged out successfully';
  }

  static async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }

    let decoded: TokenPayload;
    try {
      decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as TokenPayload;
    } catch (error) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
