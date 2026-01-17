import { NextFunction, Response } from 'express';

import { Role } from '../../types/role';
import { AuthRequest } from './auth.middleware';

export function roleMiddleware(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });

    if (!roles.includes(req.user.role as Role)) {
      return res.status(403).json({ error: 'Permissão insuficiente' });
    }

    next();
  };
}
