import type { Request, Response, NextFunction } from 'express';
import type { TokenPayload } from '../utils/token.js';
export interface AuthRequest extends Request {
    user?: TokenPayload;
}
export declare const authenticateUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map