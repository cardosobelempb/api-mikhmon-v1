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
> extends RepositoryDomain<TEntity> {
  /**
   * Busca entidades de forma paginada.
   *
   * @param params Parâmetros de busca
   */
  abstract search(
    params: SearchInput<TSortBy>,
  ): Promise<ISearchOutput<TEntity, TSortBy>>
}
