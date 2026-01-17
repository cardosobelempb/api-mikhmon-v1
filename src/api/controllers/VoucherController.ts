// api/controllers/VoucherController.ts
import { Request, Response } from 'express';

import { RouterOSClient } from '../../infra/RouterOSClient';
import { generateVoucherSchema } from '../../schemas/voucher.schema';
import { VoucherService } from '../../services/VoucherService';

export class VoucherController {
  static async generate(req: Request, res: Response) {
    const parsed = generateVoucherSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const client = new RouterOSClient();
    const service = new VoucherService(client);

    try {
      await client.connect();
      const vouchers = await service.generate(parsed.data);
      res.json(vouchers);
    } finally {
      client.disconnect();
    }
  }
}
