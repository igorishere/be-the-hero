/** Importação da lib supertest.
 * Ela serve para fazer requisições HTTP assim como o Axios.
 * O axios não é recomendado para testes. 
 */
const supertest = require('supertest');
const app = require('../../src/app');
/**DB conexão */
const knexConection = require('../../src/database/connection')




describe( 'ONG', ()=>{
    
    /**Antes de cada teste o código vai executar a migrate com a knexConnection e 
    criar a estrutura do banco*/
    beforeEach( async ()=> {

        /**Segundo o curso, é interessante desfazer as últimas
         * alterações antes de efetuar próximos testes para evitar que o banco infle 
         * ou que um dado proveniente de inserção anterior
         * interfira em um teste futuro.
         */
        await knexConection.migrate.rollback();
        await knexConection.migrate.latest();
    } )

    /**Executado depois de todos os testes */
    afterAll( async ()=>{
       await knexConection.destroy();
    } )

    it('Should be able to create an Ong' , async ()=>{
        
        const response  = await supertest( app )
        .post('/ongs')
        .send(
            {
                name: "0",
                email: "ong@ong.com.br",
                whatsapp: "51997466427",
                city: "porto alegre",
                uf: "rs"
            }
        )

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
} )