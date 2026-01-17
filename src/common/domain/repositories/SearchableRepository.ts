import { ISearchOutput, SearchInput } from './IRespositorySearch'
import { RepositoryDomain } from './RepositoryDomain'

/**
 * Extensão opcional para repositórios que suportam busca paginada.
 */
export abstract class SearchableRepository<
  TEntity,
> extends RepositoryDomain<TEntity> {
  /**
   * Busca entidades de forma paginada.
   *
   * @param params Parâmetros de busca
   */
  abstract search(params: SearchInput): Promise<ISearchOutput<TEntity>>
}
