import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { ISoftDeletable } from './ISoftDeletable'
import { SoftDeleteRepository } from './SoftDeleteRepository'

/**
 * Repositório com busca paginada e soft delete.
 */
export abstract class SearchableSoftDeleteRepository<
  TEntity extends ISoftDeletable,
> extends SoftDeleteRepository<TEntity> {
  /**
   * Busca entidades ativas por padrão.
   *
   * ⚠️ Não deve retornar registros com deletedAt != null
   */
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
}
