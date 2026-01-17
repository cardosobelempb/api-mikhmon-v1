/**
 * Representa a configuração de uma sessão
 */
export interface SessionConfig {
  enabled: boolean;
  timeout: number;
  tokens: string[];
}

/**
 * Representa a configuração geral da aplicação
 */
export interface AppConfig {
  mikhmon: {
    enabled: boolean;
    keys: string[];
  };
  sessions: Record<string, SessionConfig>;
}
