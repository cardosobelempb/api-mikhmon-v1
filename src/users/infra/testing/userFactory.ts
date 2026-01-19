import { UserEntity } from '@/users/domain'
import { UserModel } from '@/users/domain/models/user.model'
import { faker } from '@faker-js/faker'

/**
 * Factory para criação de UserEntity em testes
 * - Garante entidade válida
 * - Permite override parcial de props
 * - Respeita invariantes do domínio
 */
export function userFactory(override: Partial<UserModel> = {}): UserEntity {
  // Seed para previsibilidade (documentado)
  faker.seed(1)

  return UserEntity.create({
    name: override.name ?? faker.commerce.productName(),
    price:
      override.price ??
      Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
    quantity: override.quantity ?? 10,
  })
}
