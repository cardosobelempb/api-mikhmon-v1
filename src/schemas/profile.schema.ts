// schemas/profile.schema.ts
import { z } from 'zod';

export const createProfileSchema = z.object({
  name: z.string(),
  rateLimit: z.string(),
  sessionTimeout: z.string().optional()
});

export type CreateProfileDTO = z.infer<typeof createProfileSchema>;
