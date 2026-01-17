// api/routes/voucher.routes.ts
import { Router } from 'express'

import { Role } from '../../types/role'
import { VoucherController } from '../controllers/voucher.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { roleMiddleware } from './../middlewares/role.middleware'

const voucherRoutes = Router()

voucherRoutes.post(
  '/vouchers',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  VoucherController.generate,
)

export default voucherRoutes
