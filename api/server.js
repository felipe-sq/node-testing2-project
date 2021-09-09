const express = require('express');

// require the model for the database here

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
})

server.get('/characters', (req, res) => {
  // get all the characters from the database
  // return them as json
  res.status(200).json(characters);
})