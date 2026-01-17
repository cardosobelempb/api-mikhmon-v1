import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { RepositorySoftDelete } from './RepositorySoftDeletable'

/**
 * Repositório com busca paginada e soft delete.
 */
export abstract class RepositorySearchableSoftDelete<
  TEntity extends IRepositorySoftDeletable,
> extends RepositorySoftDelete<TEntity> {
  /**
   * Busca entidades ativas por padrão.
   *
   * ⚠️ Não deve retornar registros com deletedAt != null
   */
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
}
