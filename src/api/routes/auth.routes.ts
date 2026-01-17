// api/routes/auth.routes.ts
import { Router } from 'express'

import { AuthController } from '../controllers/auth.controller'

const authRoutes = Router()

authRoutes.post('/login', AuthController.login)
authRoutes.post('/register', AuthController.register)

export default authRoutes
