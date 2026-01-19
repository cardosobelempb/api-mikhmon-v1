<<<<<<< HEAD
<<<<<<< HEAD
import { RepositoryDomain } from './RepositoryDomain'
import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
=======
import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
import { RepositoryDomain } from './RepositoryDomain'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
import { RepositoryDomain } from './RepositoryDomain'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

/**
 * Repositório com suporte a soft delete.
 */
export abstract class RepositorySoftDelete<
  TEntity extends IRepositorySoftDeletable,
> extends RepositoryDomain<TEntity> {
  /**
   * Realiza exclusão lógica da entidade.
   */
  async softDelete(entity: TEntity): Promise<void> {
    entity.deletedAt = new Date()
    await this.save(entity)
  }

  /**
   * Restaura uma entidade excluída logicamente.
   */
  async restore(entity: TEntity): Promise<void> {
    entity.deletedAt = null
    await this.save(entity)
  }
}
