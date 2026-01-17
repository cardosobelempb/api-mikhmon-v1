import { ErrorCode, NotFoundError } from '../../errors'
import { UUIDVO } from '../../values-objects'
import { ISearchOutput, SearchInput } from '../IRespositorySearch'
import { RepositorySearchable } from '../RepositorySearchable'

/**
 * Propriedades base de uma entidade de domínio
 */
export interface ModelProps {
  id?: UUIDVO
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

/**
 * Propriedades para criação de entidade
 * Remove campos controlados pelo repositório
 */
export type CreateProps<T> = Omit<
  Partial<T>,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

/**
 * Extrai apenas as chaves string de um tipo
 * Evita number | symbol vindos do keyof
 */
type StringKeyOf<T> = Extract<keyof T, string>

/**
 * Repositório genérico em memória
 * Ideal para testes unitários e prototipagem
 */
export abstract class RepositoryInMemory<
  Entity extends ModelProps,
> implements RepositorySearchable<Entity, StringKeyOf<Entity>> {
  /** Armazena entidades em memória */
  protected items: Entity[] = []

  /** Campos permitidos para ordenação */
  protected sortableFields: StringKeyOf<Entity>[] = []

  /**
   * Busca entidade por ID
   * Retorna null se não existir ou estiver deletada
   */
  async findById(id: string): Promise<Entity | null> {
    return this.items.find(item => item.id?.equals(UUIDVO.create(id))) ?? null
  }

  async getByIdOrFail(id: string): Promise<Entity> {
    const entity = await this.findById(id)

    if (!entity) {
      throw new NotFoundError(`Entity not found using id ${id}`)
    }

    return entity
  }

  /**
   * Cria ou atualiza uma entidade
   */
  async save(entity: Entity): Promise<Entity> {
    const now = new Date()

    if (!entity.id) {
      entity.id = UUIDVO.create()
      entity.createdAt = now
    }

    const index = this.items.findIndex(item => item.id?.equals(entity.id!))

    if (index === -1) {
      this.items.push(entity)
    } else {
      this.items[index] = entity
    }

    return entity
  }

  /**
   * Soft delete da entidade
   */
  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(item => item.id?.getValue() === id)

    if (index === -1) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${id}`)
    }

    this.items.splice(index, 1)
  }

  /**
   * Normaliza os parâmetros de busca
   * Garante valores sempre consistentes
   */
  protected normalizeSearchParams(params: SearchInput<StringKeyOf<Entity>>) {
    return {
      page: params.page ?? 1,
      perPage: params.perPage ?? 15,
      sortBy: params.sortBy ?? null,
      sortDirection: params.sortDirection ?? 'asc',
      filter: params.filter ?? '',
    }
  }

  /**
   * Busca paginada com filtro e ordenação
   */
  async search(
    params: SearchInput<StringKeyOf<Entity>>,
  ): Promise<ISearchOutput<Entity, StringKeyOf<Entity>>> {
    // Normaliza parâmetros: garante valores consistentes e seguros
    const { page, perPage, sortBy, sortDirection, filter } =
      this.normalizeSearchParams(params)

    // 1️⃣ Considera apenas entidades ativas (não deletadas)
    const activeItems = this.activeItems()

    // 2️⃣ Aplica filtro de domínio
    const filteredItems = this.applyFilter(activeItems, filter)

    // 3️⃣ Aplica ordenação segura (só campos whitelist)
    const orderedItems = this.applySort(filteredItems, sortBy, sortDirection)

    // 4️⃣ Aplica paginação
    const paginatedItems = this.applyPagination(orderedItems, page, perPage)

    // 5️⃣ Retorna objeto consistente com SearchOutput
    return {
      items: paginatedItems,
      total: filteredItems.length,
      totalPages: Math.ceil(filteredItems.length / perPage),
      currentPage: page,
      perPage,
      sortBy, // ⚠️ ajusta para opcional
      sortDirection,
      filter,
    }
  }

  /**
   * Retorna apenas entidades ativas
   */
  protected activeItems(): Entity[] {
    return this.items.filter(item => !item.deletedAt)
  }

  /**
   * Busca entidade ou lança erro
   */
  protected getOrFail(id?: string): Entity {
    const entity = this.items.find(
      item => item.id?.getValue() === id && !item.deletedAt,
    )

    if (!entity) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${id}`)
    }

    return entity
  }

  /**
   * Filtro abstrato para domínio específico
   */
  protected abstract applyFilter(items: Entity[], filter?: string): Entity[]

  /**
   * Ordenação segura baseada em whitelist
   */
  protected applySort(
    items: Entity[],
    sortBy: StringKeyOf<Entity> | null,
    direction: 'asc' | 'desc',
  ): Entity[] {
    if (!sortBy || !this.sortableFields.includes(sortBy)) {
      return items
    }

    return [...items].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (aValue === bValue) return 0

      const order = aValue! > bValue! ? 1 : -1
      return direction === 'asc' ? order : -order
    })
  }

  /**
   * Paginação simples
   */
  protected applyPagination(
    items: Entity[],
    page: number,
    perPage: number,
  ): Entity[] {
    const start = (page - 1) * perPage
    return items.slice(start, start + perPage)
  }
}
