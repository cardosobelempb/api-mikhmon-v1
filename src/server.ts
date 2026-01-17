import 'dotenv/config'
import app from './app'
import { AppDataSource } from './infra/data-source'
import { logger } from './infra/logger'

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    logger.info('Database conectado')
    app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`))
  })
  .catch(err => {
    logger.error({ err }, 'Erro ao conectar no banco')
  })
