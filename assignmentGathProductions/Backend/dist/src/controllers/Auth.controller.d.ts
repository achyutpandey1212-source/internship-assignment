import type { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    static signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getCurrentUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=Auth.controller.d.ts.map