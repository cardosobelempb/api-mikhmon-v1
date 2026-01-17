import {
  ConflictError,
  ErrorCode,
  NotFoundError,
  RepositoryInMemory,
} from '@/common'
import { UserId, UserModel, UserRepository } from '@/users/domain'

type UserSortableField = 'name' | 'price' | 'createdAt'

export class UserInMemoryRepository
  extends RepositoryInMemory<UserModel>
  implements UserRepository
{
  protected sortableFields: UserSortableField[] = ['name', 'price', 'createdAt']

  async findByName(name: string): Promise<UserModel> {
    const user = this.items.find(item => item.name === name)
    if (!user) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${name}`)
    }
    return user
  }
  async findAllByIds(userIds: UserId[]): Promise<UserModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(userIds.map(userId => userId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const user = this.items.find(item => item.name === name)
    if (user) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} ${name}`)
    }
  }
  protected applyFilter(items: UserModel[], filter?: string): UserModel[] {
    if (!filter) return items
    return items.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected applySort(
    items: UserModel[],
    sortBy: keyof UserModel | null,
    direction: 'asc' | 'desc',
  ): UserModel[] {
    // se sortBy não estiver na whitelist, retorna original
    if (!sortBy || !this.sortableFields.includes(sortBy as UserSortableField)) {
      return items
    }

    const key = sortBy as UserSortableField

    return [...items].sort((a, b) => {
      let aValue = a[key]
      let bValue = b[key]

      // Normaliza Date para timestamp
      if (aValue instanceof Date) aValue = aValue.getTime()
      if (bValue instanceof Date) bValue = bValue.getTime()

      // Nulls/undefined sempre ficam no final
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      // Comparação genérica
      const order = aValue > bValue ? 1 : -1
      return direction === 'asc' ? order : -order
    })
  }
}
