// services/AuthService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jwtConfig } from '../config/jwt.config';
import { User } from '../entities/User';
import { AppDataSource } from '../infra/data-source';
import { Role } from '../types/role';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new Error('Credenciais inválidas');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciais inválidas');

    // ⚠️ jsonwebtoken 9.x aceita expiresIn como string ou número
    const token = jwt.sign(
      { sub: user.id, role: user.role as Role },
      jwtConfig.secret,
      {
        algorithm: 'HS256',
        expiresIn: jwtConfig.expiresIn as any
      }
    );

    return token;
  }

  async register(username: string, password: string, role: Role = Role.USER) {
    const hashed = await bcrypt.hash(password, 10);

    // Criando o usuário corretamente com Role
    const user = this.userRepository.create({
      username,
      password: hashed,
      role
    });

    return await this.userRepository.save(user);
  }
}
