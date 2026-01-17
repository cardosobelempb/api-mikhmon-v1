// config/jwt.config.ts
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'SUPER_SECRET_KEY',
  // expiresIn precisa ser compatível com StringValue do JWT 9.x
  expiresIn: 3600 // 3600 segundos = 1 hora
};
