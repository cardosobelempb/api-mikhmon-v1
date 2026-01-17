// api/routes/auth.routes.ts
import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/register', AuthController.register);

export default authRoutes;
