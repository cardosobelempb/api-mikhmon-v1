<<<<<<< HEAD
import { Pagination } from './pagination';
=======
import { Pagination } from './pagination'
>>>>>>> e835efd61086ec81e8ac2c9cf4b966a69c20f94d

export abstract class RepositoryAbstract<T> {
  abstract findById(id: string): Promise<T | null>
  abstract findAll(params: Pagination): Promise<T[]>
  abstract create(entity: T): Promise<void>
  abstract update(entity: T): Promise<void>
  abstract delete(entity: T): Promise<void>
}
