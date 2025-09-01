const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Suas rotas e middlewares aqui
app.get('/', (req, res) => {
  res.send('API do Museu funcionando!');
});

// Exporte como função serverless
module.exports = serverless(app);