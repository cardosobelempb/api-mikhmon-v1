import { env } from '@/common/infra/env'
import { DataSource } from 'typeorm'

/**
 * DataSource exclusivo para testes de integração
 * Nunca reutilizar em produção
 */
export const testDataSource = new DataSource({
  type: 'postgres',

  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,

  /**
   * Entidades usadas nos testes
   */
  entities: ['src/**/entities/*.{ts,js}'],

  /**
   * Em testes:
   * - synchronize = true acelera setup
   * - migrations geralmente não são necessárias
   */
  synchronize: true,
  migrationsRun: false,

  /**
   * Logs ajudam no debug de falhas
   */
  logging: true,
})
