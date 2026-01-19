/**
 * Contrato base de persistência.
 */
export abstract class RepositoryDomain<TEntity> {
  /**
   * Busca uma entidade pelo ID.
   */
  abstract findById(id: string): Promise<TEntity | null>

  /**
   * Persiste uma entidade (create ou update).
   */
  abstract save(entity: TEntity): Promise<TEntity>

  /**
   * Remove fisicamente a entidade da base.
   *
   * ⚠️ Uso restrito e consciente.
   */
<<<<<<< HEAD
  abstract delete(entity: TEntity): Promise<void>
=======
  abstract delete(id: string): Promise<void>
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d
}
