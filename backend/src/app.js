const Express =  require('express')
const Routes = require('./routes')
const cors = require('cors');

/** Biblioteca de validações */
const { errors } = require('celebrate');

const app = Express();

app.use( cors() );

//Informa a aplicação para formatar json na request
app.use( Express.json() );

//Informa a aplicação para utilizar o código do módulo de roteamento
app.use( Routes );

app.use( errors() );

module.exports = app;
