import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
const router = Router();
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', authenticateUser, AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.get('/me', authenticateUser, AuthController.getCurrentUser);
export default router;
//# sourceMappingURL=Auth.routes.js.map