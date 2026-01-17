import { appConfig } from '../config/app.config'
import { RouterOSClient } from '../infra/router-os-client'
import { CreateHotspotUserDTO } from '../schemas/hotspot.schema'
import { RouterOSResponse } from '../types/routeros-response.types'

export class HotspotService {
  constructor(private readonly client: RouterOSClient) {}

  async createUser(data: CreateHotspotUserDTO): Promise<void> {
    await this.client.execute(
      '/ip/hotspot/user/add',
      [
        `=server=${appConfig.mikhmon}`,
        `=name=${data.name}`,
        `=password=${data.password}`,
        `=profile=${data.profile}`,
        `=disabled=no`,
        data.macAddress ? `=mac-address=${data.macAddress}` : '',
        data.timeLimit ? `=limit-uptime=${data.timeLimit}` : '',
        data.dataLimit ? `=limit-bytes-total=${data.dataLimit}` : '',
        data.comment ? `=comment=${data.comment}` : '',
      ].filter(Boolean),
    )
  }

  async listUsers(): Promise<RouterOSResponse[]> {
    return this.client.execute('/ip/hotspot/user/print')
  }

  async deleteUser(id: string): Promise<void> {
    await this.client.execute('/ip/hotspot/user/remove', [`=.id=${id}`])
  }
}
