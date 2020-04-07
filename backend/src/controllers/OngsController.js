const knexConnection = require('../database/connection') //conexão com o banco
const generateUniqueId = require('../../src/utils/generateUniqueId')//método para gerar o ID da ong


module.exports ={

    /**Método para retornar todas as ONGS cadastradas
     * no banco de dados SQLITE.
     */
    async listAllOngs(req,res){

        const ongs = await knexConnection('ongs').select("*").from('ongs');
        
        return res.json( ongs );
        
        },
    
        
    /**Método para salvar uma novo registro de ONG no bancod de dados */
    async createOng( req, res ){
        /** Pegamos todas as informações da ONG
         * da requisição HTTP
         */
        const { name,email,whatsapp,city, uf } = req.body;
        
        
        /**
         * Crypto é uma biblioteca que vem com o node para criptografia.
         * Nesta linha, estamos criando um randômico de 4 bytes, e converterndo
         * para caracteres hexadecimais, assim gerando um ID
         * aleatório para a ONG.
         */
        const id = generateUniqueId();
    
    
        /** A seguir faremos a inserão no banco de dados*/
        await knexConnection('ongs').insert({ id, name,email,whatsapp,city, uf });
    
        return res.json({ id });}
}