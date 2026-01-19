import { authFactory, AuthInMemoryRepository } from '@/auth/infra'
import { ErrorCode, NotFoundError } from '@/common'

import { beforeEach, describe, expect, it } from 'vitest'

describe('AuthInmemoryRepository unit tests', () => {
  let sut: AuthInMemoryRepository

  beforeEach(() => {
    sut = new AuthInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
        expect(err.path).toBe(`${ErrorCode.NOT_FOUND} fake_name`)
        expect(err.statusCode).toBe(404)
      })
    })

    it('should find a auth by name', async () => {
      const data = authFactory({
        name: 'Curso nodejs',
      })
      const auth = await sut.save(data)
      const result = await sut.findByName(auth.name)
      expect(result).toBeDefined()
      expect(result).toStrictEqual(data)
      expect(result.name).toStrictEqual(data.name)
    })
  })
})
