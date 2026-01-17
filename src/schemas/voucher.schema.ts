// schemas/voucher.schema.ts
import { z } from 'zod';

export const generateVoucherSchema = z.object({
  quantity: z.number().min(1).max(100),
  profile: z.string(),
  timeLimit: z.string().optional(),
  dataLimit: z.string().optional(),
  comment: z.string().optional()
});

export type GenerateVoucherDTO = z.infer<typeof generateVoucherSchema>;
