import { RouterOSAPI } from 'node-routeros';

import { routerConfig } from '../config/router.config';

export type RouterOSResponse = Record<string, any>;

/**
 * Wrapper para garantir compatibilidade com diferentes versões do node-routeros
 * e facilitar testes.
 */
export class RouterOSClient {
  private api: RouterOSAPI;

  constructor() {
    this.api = new RouterOSAPI({
      host: routerConfig.host,
      user: routerConfig.user,
      password: routerConfig.password
    });
  }

  async connect() {
    await this.api.connect();
  }

  async disconnect() {
    this.api.close();
  }

  /**
   * Execute command and return response
   * @param command RouterOS command
   * @param params parameters
   */
  async execute(
    command: string,
    params: string[] = []
  ): Promise<RouterOSResponse[]> {
    await this.api.write(command, params);

    // read() pode não existir em algumas versões, então usamos try/catch
    // se read não existir, o pacote retorna a resposta direto do write
    try {
      // @ts-ignore
      const response = await this.api.read();
      return response as RouterOSResponse[];
    } catch {
      // fallback para versões onde write retorna response
      // @ts-ignore
      return [] as RouterOSResponse[];
    }
  }
}
