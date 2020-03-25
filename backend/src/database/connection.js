const knex  = require( 'knex' );
const dbConfigs = require('../../knexfile');

const knexConnection =  knex( dbConfigs.development );


module.exports = knexConnection;