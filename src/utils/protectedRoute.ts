import { RequestHandler } from 'express';

import { authMiddleware } from '../api/middlewares/auth.middleware';
import { roleMiddleware } from '../api/middlewares/role.middleware';
import { Role } from '../types/role';

function protectedRoute(roles: Role[], handler: RequestHandler) {
  return [authMiddleware, roleMiddleware(roles), handler];
}
