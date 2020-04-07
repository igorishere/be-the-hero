const knex  = require( 'knex' );
const dbConfigs = require('../../knexfile');

//seleção de ambiente via variáveis globais
const envDbConfigs = process.env.NODE_ENV === 'test' ? dbConfigs.test : dbConfigs.development;

const knexConnection =  knex( envDbConfigs );


module.exports = knexConnection;