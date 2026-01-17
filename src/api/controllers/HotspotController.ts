import { Request, Response } from 'express';

import { RouterOSClient } from '../../infra/RouterOSClient';
import { createHotspotUserSchema } from '../../schemas/hotspot.schema';
import { HotspotService } from '../../services/HotspotService';

type DeleteUserParams = {
  id: string;
};

export class HotspotController {
  static async create(req: Request, res: Response) {
    const parsed = createHotspotUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const client = new RouterOSClient();
    const service = new HotspotService(client);

    try {
      await client.connect();
      await service.createUser(parsed.data);
      res.status(201).send();
    } finally {
      client.disconnect();
    }
  }

  static async list(req: Request, res: Response) {
    const client = new RouterOSClient();
    const service = new HotspotService(client);

    try {
      await client.connect();
      const users = await service.listUsers();
      res.json(users);
    } finally {
      client.disconnect();
    }
  }

  static async remove(req: Request<DeleteUserParams>, res: Response) {
    const { id } = req.params;

    const client = new RouterOSClient();
    const service = new HotspotService(client);

    try {
      await client.connect();
      await service.deleteUser(id);
      res.status(204).send();
    } finally {
      client.disconnect();
    }
  }
}
