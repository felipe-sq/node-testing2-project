const db = require('../data/dbConfig.js')
const request = require('supertest')
const server = require('./server.js')

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

describe('endpoints', () => {
//write tests for GET /api/characters
    describe('[GET] /characters', () => {
      it('should return a status code of 200', async () => {
        const res = await request(server).get('/characters')
        expect(res.status).toBe(200)
      })
      it('should return the right number of characters', async () => {
        let res 
        await db('characters').insert(wolverine)
        res = await request(server).get('/characters')
        expect(res.body).toHaveLength(1)
      })
      it('should return the correct format of character', async () => {
        await db('characters').insert(wolverine)
        await db('characters').insert(cyclops)
        const res = await request(server).get('/characters')
        expect(res.body[0]).toMatchObject({id:1, ...wolverine})
        expect(res.body[1]).toMatchObject({id:2, ...cyclops})
      })
    })

//write tests for POST /api/characters
    describe('[POST] /characters', () => {
      it('should return a status code of 201', async () => {
        const res = await request(server).post('/characters').send(wolverine)
        expect(res.status).toBe(201)
      })
      it('should return the correct format of character', async () => {
        const res = await request(server).post('/characters').send(wolverine)
        expect(res.body).toMatchObject({id:1, ...wolverine})
      })
    })

//write tests for PUT /api/characters/:id
    describe('[PUT] /characters/:id', () => {
      it('should return a status code of 200', async () => {
        await db('characters').insert(wolverine)
        const res = await request(server).put('/characters/1').send({id:1, name: "WOLVERINE", ...wolverine})
        expect(res.status).toBe(200)
      })
      it('should return the correct format of character', async () => {
        await db('characters').insert(wolverine)
        const res = await request(server).put('/characters/1').send({id:1, name: "WOLVERINE", ...wolverine})
        expect(res.body).toMatchObject({id:1, ...wolverine})
      })
    })

//write tests for DELETE /api/characters/:id
    describe('[DELETE] /characters/:id', () => {
      it('should return a status code of 200', async () => {
        await db('characters').insert(wolverine)
        const res = await request(server).delete('/characters/1')
        expect(res.status).toBe(200)
      })
      it('should return the correct format of character', async () => {
        let res
        await db('characters').insert(wolverine)
        await db('characters').insert(cyclops)
        res = await request(server).delete('/characters/1')
        expect(res.body).toHaveLength(1)
      })
    })
})