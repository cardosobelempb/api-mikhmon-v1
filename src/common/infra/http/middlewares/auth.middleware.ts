// api/middlewares/auth.middleware.ts
import { jwtConfig } from '@/config/jwt.config'
import { Role } from '@/types/role'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: Role
  }
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Token ausente' })

  const token = auth.split(' ')[1]
  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as any
    req.user = { id: decoded.sub, role: decoded.role }
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
