import { randomBytes } from 'crypto';

import { appConfig } from '../config/appConfig';
// services/VoucherService.ts
import { RouterOSClient } from '../infra/RouterOSClient';
import { GenerateVoucherDTO } from '../schemas/voucher.schema';

export class VoucherService {
  constructor(private readonly client: RouterOSClient) {}

  async generate(data: GenerateVoucherDTO) {
    const vouchers = [];

    for (let i = 0; i < data.quantity; i++) {
      const username = this.generateCode(6);
      const password = this.generateCode(6);

      await this.client.execute(
        '/ip/hotspot/user/add',
        [
          `=server=${appConfig.mikhmon}`,
          `=name=${username}`,
          `=password=${password}`,
          `=profile=${data.profile}`,
          `=disabled=no`,
          data.timeLimit ? `=limit-uptime=${data.timeLimit}` : '',
          data.dataLimit ? `=limit-bytes-total=${data.dataLimit}` : '',
          data.comment ? `=comment=${data.comment}` : ''
        ].filter(Boolean)
      );

      vouchers.push({ username, password });
    }

    return vouchers;
  }

  private generateCode(length: number): string {
    return randomBytes(length)
      .toString('base64')
      .slice(0, length)
      .toUpperCase();
  }
}
