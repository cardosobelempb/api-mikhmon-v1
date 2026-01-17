// infrastructure/mappers/auth.mapper.ts

import { AuthEntity, AuthModel } from '@/auth/domain'

export class AuthMapper {
  static toDomain(model: AuthModel): AuthEntity {
    return AuthEntity.restore({
      id: model.id,
      name: model.name,
      price: model.price,
      quantity: model.quantity,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    })
  }

  static toModel(entity: AuthEntity): AuthModel {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      quantity: entity.quantity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    }
  }
}
