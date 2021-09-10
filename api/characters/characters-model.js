const db = require('../../data/dbConfig.js')

function getAll() {
    return db('characters')
}

function getById(id) {
    return db('characters')
        .where({ id })
        .first()
}

async function insert(character) {
    const [id] = await db('characters').insert(character, 'id')
    return getById(id)
}

async function update(id, changes) {
    await db('characters')
        .where({ id })
        .update(changes)
    return getById(id)
}

async function remove(id) {
    await db('characters')
        .where({ id })
        .del()
    return getAll()
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
}