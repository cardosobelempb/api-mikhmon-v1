import { AuthEntity, AuthModel } from '@/auth/domain'
import { faker } from '@faker-js/faker'

/**
 * Factory para criação de AuthEntity em testes
 * - Garante entidade válida
 * - Permite override parcial de props
 * - Respeita invariantes do domínio
 */
export function authFactory(override: Partial<AuthModel> = {}): AuthEntity {
  // Seed para previsibilidade (documentado)
  faker.seed(1)

  return AuthEntity.create({
    name: override.name ?? faker.commerce.productName(),
    price:
      override.price ??
      Number(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
    quantity: override.quantity ?? 10,
  })
}
