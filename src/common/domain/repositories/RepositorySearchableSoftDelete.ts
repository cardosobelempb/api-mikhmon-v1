<<<<<<< HEAD
import { SearchInput, SearchOutput } from './RespositorySearch'
import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
=======
import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
import { ISearchOutput, SearchInput } from './IRespositorySearch'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
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
<<<<<<< HEAD
  abstract search(params: SearchInput): Promise<SearchOutput<TEntity>>
=======
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
}
