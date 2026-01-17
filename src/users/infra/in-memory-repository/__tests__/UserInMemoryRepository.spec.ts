import { ConflictError, NotFoundError } from '@/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { userFactory } from '../../testing/userFactory'
import { UserInMemoryRepository } from '../UserInMemoryRepository'

describe('UserInmemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
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

  describe('conflictngName', async () => {
    it('should throw error when name user not found', async () => {
      const data = userFactory({
        name: 'Curso nodejs',
      })

      sut['items'].push(data)
      await sut.conflictngName('Curso nodejs').catch(err => {
        expect(err).toBeInstanceOf(ConflictError)
        expect(err.statusCode).toBe(409)
      })
    })

    it('should not find a user by name', async () => {
      expect.assertions(0)
      await sut.conflictngName('Curso nodejs')
    })
  })

  describe('applayFilter', () => {
    it('should no filter when filter param is null', async () => {
      // const result = stubFactory.create(props)
      const data = userFactory({})
      sut['items'].push(data)

      const spyFilterMethod = vi.spyOn(sut['items'], 'filter' as any)

      const result = await sut['applyFilter'](sut['items'])

      expect(spyFilterMethod).not.toHaveBeenCalled()
      expect(result).toStrictEqual(sut['items'])
    })

    it('should filter when filter param', async () => {
      // const result = stubFactory.create(props)
      const items = [
        userFactory({
          name: 'Test',
          price: 10,
        }),
        userFactory({
          name: 'TEST',
          price: 20,
        }),
        userFactory({
          name: 'fake',
          price: 30,
        }),
      ]

      sut['items'].push(...items)

      const spyFilterMethod = vi.spyOn(sut['items'], 'filter' as any)

      let result = await sut['applyFilter'](sut['items'], 'TEST')

      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])
      expect(result).toHaveLength(2)

      result = await sut['applyFilter'](sut['items'], 'test')

      expect(spyFilterMethod).toHaveBeenCalledTimes(2)
      expect(result).toStrictEqual([items[0], items[1]])
      expect(result).toHaveLength(2)

      result = await sut['applyFilter'](sut['items'], 'no-ilter')

      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
      expect(result).toHaveLength(0)
    })
  })

  describe('applySort', () => {
    it('should sort items by createdAt desc and ignore non-sortable fields', () => {
      sut['sortableFields'] = ['name', 'price', 'createdAt']

      const users = [
        userFactory({ name: 'c', createdAt: new Date(2026, 0, 1) }),
        userFactory({ name: 'a', createdAt: new Date(2026, 0, 3) }),
        userFactory({ name: 'b', createdAt: new Date(2026, 0, 2) }),
      ]

      sut['items'].push(...users)

      const resultDesc = sut['applySort'](sut['items'], 'createdAt', 'desc')
      console.log(resultDesc.map(p => p.name)) // ['a','b','c']

      const resultAsc = sut['applySort'](sut['items'], 'name', 'asc')
      console.log(resultAsc.map(p => p.name)) // ['a','b','c']
    })

    it('should sort items by name asc/desc according to whitelist', () => {
      const items = [
        userFactory({ name: 'b', price: 10 }),
        userFactory({ name: 'a', price: 20 }),
        userFactory({ name: 'c', price: 30 }),
      ]

      sut['items'].push(...items)

      // Descendente
      let result = sut['applySort'](items, 'name', 'desc')
      expect(result.map(i => i.name)).toStrictEqual(['c', 'b', 'a'])

      // Ascendente
      result = sut['applySort'](items, 'name', 'asc')
      expect(result.map(i => i.name)).toStrictEqual(['a', 'b', 'c'])

      // Campo não-sortável → retorna array original
      const resultPrice = sut['applySort'](items, 'price' as any, 'asc')
      expect(resultPrice).toStrictEqual(items)
    })
  })
})
