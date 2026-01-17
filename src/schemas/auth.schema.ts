// schemas/auth.schema.ts
import { z } from 'zod';

/**
 * Schema de login
 * - username e password são obrigatórios
 */
export const loginSchema = z.object({
  username: z.string().min(3, 'username precisa ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'password precisa ter no mínimo 6 caracteres')
});

/**
 * Schema de registro
 * - role é opcional (por padrão é USER)
 */
export const registerSchema = z.object({
  username: z.string().min(3, 'username precisa ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'password precisa ter no mínimo 6 caracteres'),
  role: z.enum(['ADMIN', 'USER']).optional()
});

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
