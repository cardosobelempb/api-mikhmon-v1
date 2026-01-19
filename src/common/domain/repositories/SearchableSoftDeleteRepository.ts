<<<<<<< HEAD
import { SearchInput, SearchOutput } from './Search'
import { SoftDeletable } from './SoftDeletable'
=======
import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { ISoftDeletable } from './ISoftDeletable'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
import { SoftDeleteRepository } from './SoftDeleteRepository'

/**
 * Repositório com busca paginada e soft delete.
 */
export abstract class SearchableSoftDeleteRepository<
<<<<<<< HEAD
  TEntity extends SoftDeletable,
=======
  TEntity extends ISoftDeletable,
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
> extends SoftDeleteRepository<TEntity> {
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
