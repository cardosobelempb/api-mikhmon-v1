// domain/entities/auth.entity.ts
import { EntityDomain, UUIDVO } from '@/common'

import { AuthProps } from './auth.props'

export class AuthEntity extends EntityDomain<AuthProps> {
  /* =======================
   * Getters
   * ======================= */

  get id(): UUIDVO {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get price(): number {
    return this.props.price
  }

  get quantity(): number {
    return this.props.quantity
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt
  }

  /* =======================
   * Regras de negócio
   * ======================= */

  updatePrice(price: number): void {
    if (price < 0) {
      throw new Error('Preço não pode ser negativo')
    }

    this.props.price = price
    this.touch()
  }

  increaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('Quantidade inválida')
    }

    this.props.quantity += amount
    this.touch()
  }

  softDelete(): void {
    if (this.props.deletedAt) {
      throw new Error('Produto já está deletado')
    }

    this.props.deletedAt = new Date()
    this.touch()
  }

  /* =======================
   * Métodos internos
   * ======================= */

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  /* =======================
   * Fábricas
   * ======================= */

  static create(props: {
    name: string
    price: number
    quantity: number
  }): AuthEntity {
    if (props.price < 0) {
      throw new Error('Preço não pode ser negativo')
    }

    const now = new Date()

    return new AuthEntity({
      id: UUIDVO.create(),
      name: props.name,
      price: props.price,
      quantity: props.quantity,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    })
  }

  static restore(props: AuthProps): AuthEntity {
    return new AuthEntity(props)
  }
}
