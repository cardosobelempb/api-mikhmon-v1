// infra/data-source.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { dbConfig } from '../config/db.config'
import { User } from '../entities/user'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User],
  synchronize: true, // 🔥 em produção use migrations
})
