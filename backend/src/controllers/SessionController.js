const knexConnection = require('../database/connection')

module.exports={

    async create(req, res){
        
        const { id } = req.body;

        const ong = await knexConnection('ongs')
        .where('id', id)
        .select("name")
        .first()
        
        if( !ong ){
            return res.status(401).json({erro: "ID inválido"})
        }

        return res.json(ong);
    }
}