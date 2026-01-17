import { AuthId, AuthModel, AuthRepository } from '@/auth/domain'
import {
  ConflictError,
  ErrorCode,
  NotFoundError,
  RepositoryInMemory,
} from '@/common'

type AuthSortableField = 'name' | 'price' | 'createdAt'

export class AuthInMemoryRepository
  extends RepositoryInMemory<AuthModel>
  implements AuthRepository
{
  protected sortableFields: AuthSortableField[] = ['name', 'price', 'createdAt']

  async findByName(name: string): Promise<AuthModel> {
    const auth = this.items.find(item => item.name === name)
    if (!auth) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${name}`)
    }
    return auth
  }
  async findAllByIds(authIds: AuthId[]): Promise<AuthModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(authIds.map(authId => authId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const auth = this.items.find(item => item.name === name)
    if (auth) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} ${name}`)
    }
  }
  protected applyFilter(items: AuthModel[], filter?: string): AuthModel[] {
    if (!filter) return items
    return items.filter(auth =>
      auth.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected applySort(
    items: AuthModel[],
    sortBy: keyof AuthModel | null,
    direction: 'asc' | 'desc',
  ): AuthModel[] {
    // se sortBy não estiver na whitelist, retorna original
    if (!sortBy || !this.sortableFields.includes(sortBy as AuthSortableField)) {
      return items
    }

    const key = sortBy as AuthSortableField

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
