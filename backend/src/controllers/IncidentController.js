const knexConnection = require('../database/connection') //conexão com o banco
const crypto = require('crypto')//método para gerar o ID da ong

module.exports ={

    /**Método para retornar todas as causas cadastradas
     * no banco de dados SQLITE.
     */
    async listAllIncidents(req,res){
        
        /**Se a página não for informada, a função considera '1' */
        const { page = 1} = req.query;
        
        /** Pega todos os registros e trás conforme a paginação */
        const incidents = await knexConnection('incidents')
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.whatsapp',
            'ongs.email',
            'ongs.city',
            'ongs.uf',
        ])
        .from('incidents')
        .join( 'ongs', 'ong_id', '=', 'incidents.ong_id' )
        .limit(5)
        .offset( (page-1) * 5 );
        
        
        /**Conta o número de registros */
        const [count] = await knexConnection('incidents').count();
        
        /** Insere o total no cabeçalho do retorno */
        res.header('X-Total-Count',count['count(*)']);

        /** Retorna todos os incidentes */
        return res.json( incidents )    
    },
    
        
    /**Método para salvar uma nova causa no banco de dados */
    async createIncident( req, res ){
        /** Pegamos todas as informações da causa
         * da requisição HTTP
         */
        const ong_id = req.headers.authorization;
        const { title, description, value } = req.body;
        
        
        /**
         * Crypto é uma biblioteca que vem com o node para criptografia.
         * Nesta linha, estamos criando um randômico de 4 bytes, e converterndo
         * para caracteres hexadecimais, assim gerando um ID
         * aleatório para a ONG.
         */
    
    
        /** A seguir faremos a inserão no banco de dados*/
       const [id] = await knexConnection('incidents').insert({ title, description,value,ong_id});
    
        return res.json({ id });
    },

    /** Método para deletar uma causa */
    async deleteIncident(req,res){
        
        
        /**Aqui pegamos o ID do caso que vai ser excluído,
         * que deverá ser enviado via route params
         */
        const {id} = req.params; 
        console.log('here');
        /**Pegamos tbm o ID da ong logada */
        const ong_id =  req.headers.authorization;

        /**Pegamos o ong_id que está salvo na tabela de causas*/
        const incident = await knexConnection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        /**  Se o ID logado for diferente do ID contido em
         * ong_id, o sistema retorna erro.
         */
        if( incident.ong_id !== ong_id){
            return res.status( 401 )
            .json( {msg: 'Somente o criador da causa pode deleta-la'});
        }

        /** Se tudo der certo, deleta o registro */
        await knexConnection('incidents').where('id', id).delete()
        return res.status( 204 ).send();
    }
}