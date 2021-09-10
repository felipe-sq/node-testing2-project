const express = require('express');
const Characters = require('./characters/characters-model.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
})

server.get('/characters', (req, res) => {
  // get all the characters from the database
  Characters.getAll()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

server.post('/characters', (req, res) => {
  // add a character to the database
  const character = req.body;
  Characters.insert(character)
    .then(character => {
      res.status(201).json(character);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

server.put('/characters/:id', (req, res) => {
  // update a character in the database
  const id = req.params.id;
  const changes = req.body;
  Characters.update(id, changes)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

server.delete('/characters/:id', (req, res) => {
  // delete a character from the database
  const id = req.params.id;
  Characters.remove(id)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = server;