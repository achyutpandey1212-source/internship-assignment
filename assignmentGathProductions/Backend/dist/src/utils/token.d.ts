export interface TokenPayload {
    id: string;
    email: string;
}
export declare const generateAccessToken: (payload: TokenPayload) => string;
export declare const generateRefreshToken: (payload: TokenPayload) => string;
//# sourceMappingURL=token.d.ts.map