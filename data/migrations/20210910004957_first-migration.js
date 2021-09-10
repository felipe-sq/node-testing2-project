
exports.up = function(knex) {
  return knex.schema.createTable('characters', tbl => { 
    tbl.increments('id')
    tbl.string('name', 128).unique().notNullable()
    tbl.string('codename', 128).notNullable()
    tbl.string('abilities', 128).notNullable()
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters');
};
