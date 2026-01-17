import { UUIDVO } from '@/common'

export interface AuthModel {
  id: UUIDVO // 🔒 obrigatório
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
