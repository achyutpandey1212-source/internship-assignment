import type { SignupDTO, LoginDTO, AuthResponse } from '../types/auth.types.js';
export declare class AuthService {
    static signup(signupDTO: SignupDTO): Promise<AuthResponse>;
    static login(loginDTO: LoginDTO): Promise<AuthResponse>;
    static logout(userId: string): Promise<string>;
    static refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
//# sourceMappingURL=Auth.service.d.ts.map