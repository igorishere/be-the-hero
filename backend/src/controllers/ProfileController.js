const knexConnection = require('../database/connection')

module.exports ={

   /**Lista todas as ongs cadastradas*/
    async list(req, res){

        const ong_id = req.headers.authorization;

        const incidents =  await knexConnection('incidents')
        .where('ong_id', ong_id)
        .select("*");

        return res.json( incidents );
    }
}