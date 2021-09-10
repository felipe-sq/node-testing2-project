const Characters = require('./characters-model.js')
const db = require('../../data/dbConfig.js')

const wolverine = {name: 'Logan', codename: 'Wolverine', abilities: 'Regeneration, adamantium claws'}
const cyclops = {name: 'Scott Summers', codename: 'Cyclops', abilities: 'Optic blasts (beams of energy)'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('characters').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('characters model', () => {
// Test 1: Add a character
  describe('insert function', () => {
    it("should insert a character to the database", async () => {
      let all
      await Characters.insert(wolverine)
      all = await db('characters')
      expect(all).toHaveLength(1)
    })
  })
// Test 2: Get all characters
  describe('getAll function', () => {
    it("should return all characters", async () => {
      let all
      await db('characters').insert(wolverine)
      await db('characters').insert(cyclops)
      all = await Characters.getAll()
      expect(all).toHaveLength(2)
    })
  })
// Test 3: Get a character by id
  describe('getById function', () => {
    it("should return a character by id", async () => {
      let all
      await db('characters').insert(wolverine)
      all = await Characters.getById(1)
      expect(all).toMatchObject({id:1, ...wolverine})
    })
  })
// Test 4: Update a character
  describe('update function', () => {
    it("should update a character by id", async () => {
      const [id] = await db('characters').insert(wolverine)
      await Characters.update(id, {codename: 'Weapon X'})
      const updated = await db('characters').where({id}).first()
      expect(updated.codename).toBe('Weapon X')
    })
    it("check the updated character", async () => {
      const [id] = await db('characters').insert(wolverine)
      await Characters.update(id, {codename: 'Weapon X', ...wolverine})
      const updated = await db('characters').where({id}).first()
      expect(updated).toMatchObject({id, codename: 'Weapon X', ...wolverine})  
    })
  })
// Test 5: Delete a character
  describe('remove function', () => {
    it("should remove a character by id", async () => {
      const [id] = await db('characters').insert(wolverine)
      await Characters.remove(id)
      const all = await db('characters')
      expect(all).toHaveLength(0)
    })
  })
})