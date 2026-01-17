import { ErrorCode, NotFoundError } from '@/common'
import { userFactory, UserInMemoryRepository } from '@/users/infra'

import { beforeEach, describe, expect, it } from 'vitest'

describe('UserInmemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
        expect(err.path).toBe(`${ErrorCode.NOT_FOUND} fake_name`)
        expect(err.statusCode).toBe(404)
      })
    })

    it('should find a user by name', async () => {
      const data = userFactory({
        name: 'Curso nodejs',
      })
      const user = await sut.save(data)
      const result = await sut.findByName(user.name)
      expect(result).toBeDefined()
      expect(result).toStrictEqual(data)
      expect(result.name).toStrictEqual(data.name)
    })
  })
})
