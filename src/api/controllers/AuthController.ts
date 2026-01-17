// api/controllers/AuthController.ts
import { Request, Response } from 'express';
import { logger } from '../../infra/logger';
import { loginSchema, registerSchema } from '../../schemas/auth.schema';
import { AuthService } from '../../services/AuthService';
import { Role } from '../../types/role';

export class AuthController {
  static async login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const { username, password } = parsed.data;

    try {
      const token = await new AuthService().login(username, password);
      logger.info({ username }, 'Login realizado');
      res.json({ token });
    } catch (err) {
      logger.error({ err }, 'Falha no login');
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  }

  static async register(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const { username, password, role } = parsed.data;

    try {
      // Convertendo o role string para Role enum
      const roleEnum = role === 'ADMIN' ? Role.ADMIN : Role.USER;

      const user = await new AuthService().register(
        username,
        password,
        roleEnum
      );
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
  }
}
