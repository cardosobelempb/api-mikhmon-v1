import { RepositorySearchable, UUIDVO } from '@/common'

import { UserModel } from '../models/user.model'

export type UserId = {
  id: UUIDVO
}
export type UserCreateProps = {
  id: UUIDVO
  name: string
  price: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null // registros não deletados
}

export abstract class UserRepository extends RepositorySearchable<UserModel> {
  abstract findByName(name: string): Promise<UserModel>
  abstract findAllByIds(userIds: UserId[]): Promise<UserModel[]>
  abstract conflictngName(name: string): Promise<void>
}
