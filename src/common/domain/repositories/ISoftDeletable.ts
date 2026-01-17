/**
 * Marca uma entidade como apta a soft delete.
 */
export interface ISoftDeletable {
  /**
   * Data da exclusão lógica.
   * null = entidade ativa
   */
  deletedAt: Date | null
}
