import { RepositorySearchable, UUIDVO } from '@/common'

import { AuthModel } from '../models/auth.model'

export type AuthId = {
  id: UUIDVO
}
export type AuthCreateProps = {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null // registros não deletados
}

export abstract class AuthRepository extends RepositorySearchable<AuthModel> {
  abstract findByName(name: string): Promise<AuthModel>
  abstract findAllByIds(authIds: AuthId[]): Promise<AuthModel[]>
  abstract conflictngName(name: string): Promise<void>
}
