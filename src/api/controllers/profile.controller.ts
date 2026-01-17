import { Request, Response } from 'express'

import { logger } from '../../infra/logger'
import { RouterOSClient, RouterOSResponse } from '../../infra/router-os-client'
import { HotspotProfileService } from '../../services/hotspot-profile.service'

export class ProfileController {
  static async list(req: Request, res: Response) {
    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()

      // Aqui SIM é um array de profiles
      const profiles: RouterOSResponse[] = await service.list()

      // E aqui eu retorno o array como JSON
      return res.json(profiles)
    } catch (err) {
      logger.error({ err }, 'Erro ao listar profiles')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }

  static async create(req: Request, res: Response) {
    const { name, rateLimit, sessionTimeout } = req.body

    if (!name || !rateLimit) {
      return res.status(400).json({
        error: 'name e rateLimit são obrigatórios',
      })
    }

    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()

      const result = await service.create({
        name,
        rateLimit,
        sessionTimeout,
      })

      // Retorna o resultado do RouterOS (pode ser array vazio ou com objeto)
      return res.status(201).json(result)
    } catch (err) {
      logger.error({ err }, 'Erro ao criar profile')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'ID inválido' })
    }

    const client = new RouterOSClient()
    const service = new HotspotProfileService(client)

    try {
      await client.connect()
      await service.delete(id)
      return res.status(204).send()
    } catch (err) {
      logger.error({ err }, 'Erro ao remover profile')
      return res.status(500).json({ error: 'Erro interno' })
    } finally {
      await client.disconnect()
    }
  }
}
