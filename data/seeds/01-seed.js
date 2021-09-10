exports.seed = function(knex) {
  return knex('characters')
    .truncate()
    .then(function() {
      return knex('characters').insert([
        { 
          name: 'Ororo Monroe', 
          codename: 'Storm', 
          abilities: 'Weather manipulation, flight'
        },
        { 
          name: 'Jean Grey', 
          codename: 'Phoenix', 
          abilities: 'Telekinesis, telepathy'
        },
        { 
          name: 'Anna Marie LeBeau', 
          codename: 'Rogue', 
          abilities: 'Absorbs memories, powers, personality, etc. through tactile contact'
        },
      ]);
    });
};
