import {
  ConflictError,
  ErrorCode,
  NotFoundError,
  RepositoryInMemory,
} from '@/common'
import { ProductId, ProductModel, ProductRepository } from '@/products/domain'

type ProductSortableField = 'name' | 'price' | 'createdAt'

export class ProductInMemoryRepository
  extends RepositoryInMemory<ProductModel>
  implements ProductRepository
{
  protected sortableFields: ProductSortableField[] = [
    'name',
    'price',
    'createdAt',
  ]

  async findByName(name: string): Promise<ProductModel> {
    const product = this.items.find(item => item.name === name)
    if (!product) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${name}`)
    }
    return product
  }
  async findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(productIds.map(productId => productId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async conflictngName(name: string): Promise<void> {
    const product = this.items.find(item => item.name === name)
    if (product) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} ${name}`)
    }
  }
  protected applyFilter(
    items: ProductModel[],
    filter?: string,
  ): ProductModel[] {
    if (!filter) return items
    return items.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  protected applySort(
    items: ProductModel[],
    sortBy: keyof ProductModel | null,
    direction: 'asc' | 'desc',
  ): ProductModel[] {
    // se sortBy não estiver na whitelist, retorna original
    if (
      !sortBy ||
      !this.sortableFields.includes(sortBy as ProductSortableField)
    ) {
      return items
    }

    const key = sortBy as ProductSortableField

    return [...items].sort((a, b) => {
      let aValue = a[key]
      let bValue = b[key]

      // Normaliza Date para timestamp
      if (aValue instanceof Date) aValue = aValue.getTime()
      if (bValue instanceof Date) bValue = bValue.getTime()

      // Nulls/undefined sempre ficam no final
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      // Comparação genérica
      const order = aValue > bValue ? 1 : -1
      return direction === 'asc' ? order : -order
    })
  }
}
