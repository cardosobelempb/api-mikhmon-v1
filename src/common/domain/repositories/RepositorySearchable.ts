<<<<<<< HEAD
<<<<<<< HEAD
import { RepositoryDomain } from './RepositoryDomain'
import { SearchInput, SearchOutput } from './RespositorySearch'

/**
 * Extensão opcional para repositórios que suportam busca paginada.
 */
export abstract class RepositorySearchable<
  TEntity,
=======
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { RepositoryDomain } from './RepositoryDomain'

/**
 * Extrai apenas chaves string de um tipo
 */
export type StringKeyOf<T> = Extract<keyof T, string>

/**
 * Extensão para repositórios que suportam busca paginada.
 */
export abstract class RepositorySearchable<
  TEntity,
  TSortBy extends string = StringKeyOf<TEntity>,
<<<<<<< HEAD
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
> extends RepositoryDomain<TEntity> {
  /**
   * Busca entidades de forma paginada.
   *
   * @param params Parâmetros de busca
   */
<<<<<<< HEAD
<<<<<<< HEAD
  abstract search(params: SearchInput): Promise<SearchOutput<TEntity>>
=======
  abstract search(
    params: SearchInput<TSortBy>,
  ): Promise<ISearchOutput<TEntity, TSortBy>>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
  abstract search(
    params: SearchInput<TSortBy>,
  ): Promise<ISearchOutput<TEntity, TSortBy>>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
}
