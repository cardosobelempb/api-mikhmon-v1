/**
 * Direção de ordenação
 */
export type SortDirection = 'asc' | 'desc'

/**
 * Contrato base de paginação
 */
export interface IPaginationInput {
  page?: number
  perPage?: number
}

export type SearchInput<SortBy extends string = string> = {
  page?: number
  perPage?: number
  filter?: string
  sortBy?: SortBy
  sortDirection?: 'asc' | 'desc'
}

/**
 * Entrada de busca genérica
 * SortBy é tipado pelo domínio
 */
/**
 * Saída padronizada de busca
 */
export interface ISearchOutput<Entity, SortBy extends string = string> {
  items: Entity[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
  sortBy: SortBy | null
  sortDirection: SortDirection
  filter: string
}

export type StringKeyOf<T> = Extract<keyof T, string>
