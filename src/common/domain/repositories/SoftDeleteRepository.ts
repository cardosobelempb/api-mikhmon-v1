<<<<<<< HEAD
<<<<<<< HEAD
import { Repository } from './Repository'
import { SoftDeletable } from './SoftDeletable'
=======
import { SoftDeletable } from './ISoftDeletable'
import { Repository } from './Repository'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
=======
import { SoftDeletable } from './ISoftDeletable'
import { Repository } from './Repository'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

/**
 * Repositório com suporte a soft delete.
 */
export abstract class SoftDeleteRepository<
  TEntity extends SoftDeletable,
> extends Repository<TEntity> {
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
