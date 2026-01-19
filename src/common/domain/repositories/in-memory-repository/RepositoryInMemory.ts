<<<<<<< HEAD
<<<<<<< HEAD
import { NotFoundError } from '../../errors'
import { UUIDVO } from '../../values-objects'
import { SearchInput, SearchOutput } from '../Search'
import { SearchableRepository } from '../SearchableRepository'

/**
 * Tipos de propriedades genéricas de uma entidade
 */
export type ModelProps = {
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
import { ErrorCode, NotFoundError } from '../../errors'
import { UUIDVO } from '../../values-objects'
import { ISearchOutput, SearchInput } from '../IRespositorySearch'
import { RepositorySearchable } from '../RepositorySearchable'

/**
 * Propriedades base de uma entidade de domínio
 */
export interface ModelProps {
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
  id?: UUIDVO
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
<<<<<<< HEAD
<<<<<<< HEAD
  [key: string]: any
}

/**
 * Tipos para criação de entidade
 */
export type CreateProps<Entity> = Partial<
  Omit<Entity, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
>

/**
 * Repositório genérico em memória
 * Útil para testes ou prototipagem
 */
export abstract class RepositoryInMemory<
  Entity extends ModelProps,
> implements SearchableRepository<Entity> {
  /** Armazena todas as entidades em memória */
  protected items: Entity[] = []

  /** Campos que podem ser usados para ordenação */
  protected sortableFields: (keyof Entity)[] = []

  /**
   * Busca entidade por ID. Retorna null se não encontrar.
   * @param id string
   */
  async findById(id: string): Promise<Entity | null> {
    try {
      return await this._get(id)
    } catch {
      return null
    }
  }

  /**
   * Cria uma nova entidade em memória
   * Não persiste
   */
  // newEntity(props: CreateProps<Entity>): Entity {
  //   return {
  //     id: randomUUID(),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     deletedAt: null,
  //     ...props,
  //   } as Entity
  // }

  /**
   * Persiste ou atualiza a entidade em memória
   */
  async save(entity: Entity): Promise<Entity> {
    if (!entity.id) {
      entity.id = UUIDVO.create()
      entity.createdAt = new Date()
    }

    // entity.updatedAt = new Date()
    const index = this.items.findIndex(item => item.id?.equals(entity.id))
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

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
<<<<<<< HEAD
<<<<<<< HEAD
  async delete(entity: Entity): Promise<void> {
    await this._get(entity.id?.getValue())
    const index = this.items.findIndex(item => item.id === entity.id)

    // if (index === -1) {
    //   throw new NotFoundError(`Entity not found using id ${entity.id}`)
    // }

    this.items.splice(index, 1)
    // Agora TypeScript sabe que items[index] existe
    // this.items[index]!.deletedAt = new Date()
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
  }

  /**
   * Busca paginada com filtro e ordenação
   */
<<<<<<< HEAD
<<<<<<< HEAD
  async search(params: SearchInput): Promise<SearchOutput<Entity>> {
    const page = params.page ?? 1
    const perPage = params.perPage ?? 15
    const sortBy = params.sortBy ?? ''
    const sortDirection = params.sortDirection ?? 'asc'
    const filter = params.filter ?? ''

    // Aplicar filtro, ordenação e paginação
    const filteredItems = await this.applyFilter(this.items, filter)
    const orderedItems = this.applySort(filteredItems, sortBy, sortDirection)
    const paginatedItems = await this.applyPagination(
      orderedItems,
      page,
      perPage,
    )

=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
    return {
      items: paginatedItems,
      total: filteredItems.length,
      totalPages: Math.ceil(filteredItems.length / perPage),
      currentPage: page,
      perPage,
<<<<<<< HEAD
<<<<<<< HEAD
      sortBy, // sempre string
      sortDirection,
      filter, // sempre string
=======
      sortBy, // ⚠️ ajusta para opcional
      sortDirection,
      filter,
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
      sortBy, // ⚠️ ajusta para opcional
      sortDirection,
      filter,
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
    }
  }

  /**
<<<<<<< HEAD
<<<<<<< HEAD
   * Busca entidade por ID ou lança erro
   */
  protected async _get(id: string | undefined): Promise<Entity> {
    const entity = this.items.find(
      item => item.id?.getValue() === id && !item.deletedAt,
    )
    if (!entity) throw new NotFoundError(`Entity not found using id ${id}`)
    return entity
  }

  /** Filtro abstrato para ser implementado nas subclasses */
  protected abstract applyFilter(
    items: Entity[],
    filter?: string,
  ): Promise<Entity[]>

  /** Ordenação genérica e segura */
  protected applySort(
    items: Entity[],
    sortBy?: keyof Entity,
    sortDirection: 'asc' | 'desc' = 'asc',
  ): Entity[] {
    if (!sortBy || !this.sortableFields.includes(sortBy)) return items
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

    return [...items].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

<<<<<<< HEAD
<<<<<<< HEAD
      if (aValue == null) return 1
      if (bValue == null) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'desc' ? bValue - aValue : aValue - bValue
      }

      return 0
    })
  }

  /** Paginação genérica de itens */
  protected async applyPagination(
    items: Entity[],
    page: number = 1,
    perPage: number = 10,
  ): Promise<Entity[]> {
    const start = (page - 1) * perPage
    const end = start + perPage

    // Retorna uma cópia paginada do array
    return items.slice(start, end)
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
  }
}
