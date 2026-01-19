// domain/entities/auth.props.ts
import { UUIDVO } from '@/common'

export interface AuthProps {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
