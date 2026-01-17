// infrastructure/mappers/user.mapper.ts

import { UserEntity, UserModel } from '@/users/domain'

export class UserMapper {
  static toDomain(model: UserModel): UserEntity {
    return UserEntity.restore({
      id: model.id,
      name: model.name,
      price: model.price,
      quantity: model.quantity,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    })
  }

  static toModel(entity: UserEntity): UserModel {
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
