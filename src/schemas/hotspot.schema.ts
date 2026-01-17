import { z } from 'zod';

export const createHotspotUserSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(3),
  profile: z.string(),
  macAddress: z.string().optional(),
  timeLimit: z.string().optional(),
  dataLimit: z.string().optional(),
  comment: z.string().optional()
});

export type CreateHotspotUserDTO = z.infer<typeof createHotspotUserSchema>;
