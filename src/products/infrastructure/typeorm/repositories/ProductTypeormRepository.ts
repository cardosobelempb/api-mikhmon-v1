import {
  ISearchOutput,
  SearchInput,
} from '@/common/domain/repositories/IRespositorySearch'
import { dataSource } from '@/common/infra/typeorm'
import { ProductId, ProductModel, ProductRepository } from '@/products/domain'
import { Repository } from 'typeorm'
import { ProductOrmEntity } from '../entities'

type ProductSortableField = 'name' | 'createdAt'

export class ProductTypeormRepository implements ProductRepository {
  protected sortableFields: ProductSortableField[] = ['name', 'createdAt']
  protected productRepository: Repository<ProductOrmEntity>

  constructor() {
    this.productRepository = dataSource.getMongoRepository(ProductOrmEntity)
  }

  async findByName(name: string): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  async findAllByIds(productIds: ProductId[]): Promise<ProductModel[]> {
    throw new Error('Method not implemented.')
  }

  async conflictngName(name: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async search(
    params: SearchInput<keyof ProductModel>,
  ): Promise<ISearchOutput<ProductModel, keyof ProductModel>> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<ProductModel | null> {
    throw new Error('Method not implemented.')
  }

  async save(entity: ProductModel): Promise<ProductModel> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
