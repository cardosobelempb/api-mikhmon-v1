import { Router } from 'express';

import { Role } from '../../types/role';
import { ProfileController } from '../controllers/ProfileController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN, Role.USER]),
  ProfileController.list
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ProfileController.create
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ProfileController.remove
);

export default router;
