<<<<<<< HEAD
<<<<<<< HEAD
import { Repository } from './Repository'
import { SearchInput, SearchOutput } from './Search'
=======
import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { RepositoryDomain } from './RepositoryDomain'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { RepositoryDomain } from './RepositoryDomain'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

/**
 * Extensão opcional para repositórios que suportam busca paginada.
 */
export abstract class SearchableRepository<
  TEntity,
<<<<<<< HEAD
<<<<<<< HEAD
> extends Repository<TEntity> {
=======
> extends RepositoryDomain<TEntity> {
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
> extends RepositoryDomain<TEntity> {
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
  /**
   * Busca entidades de forma paginada.
   *
   * @param params Parâmetros de busca
   */
<<<<<<< HEAD
<<<<<<< HEAD
  abstract search(params: SearchInput): Promise<SearchOutput<TEntity>>
=======
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
}
