import { RouterOSClient, RouterOSResponse } from '../infra/router-os-client'

export type HotspotProfileDTO = {
  name: string
  rateLimit: string
  sessionTimeout?: string
}

export class HotspotProfileService {
  constructor(private readonly client: RouterOSClient) {}

  async list(): Promise<RouterOSResponse[]> {
    return this.client.execute('/ip/hotspot/user/profile/print')
  }

  async create(data: HotspotProfileDTO): Promise<RouterOSResponse[]> {
    const params = [
      `=name=${data.name}`,
      `=rate-limit=${data.rateLimit}`,
      data.sessionTimeout ? `=session-timeout=${data.sessionTimeout}` : '',
    ].filter(Boolean)

    return this.client.execute('/ip/hotspot/user/profile/add', params)
  }

  async delete(id: string): Promise<RouterOSResponse[]> {
    return this.client.execute('/ip/hotspot/user/profile/remove', [
      `=.id=${id}`,
    ])
  }
}
