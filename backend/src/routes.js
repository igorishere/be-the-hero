/** Importamos o express */
const express = require('express');

/** Biblioteca de validação dos campos do request */
const {celebrate, Segments, Joi} = require('celebrate')

/** Importação de controllers */
const OngControler = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');



/** Configuramos uma variável para ficar responsável
 * por rotear a aplicação
 */
const routes = express.Router();

/** Depois de configurados, 'routes' fica responsável por 
 * identificar qual a rota está sendo requerido, e executar determinado código.
 */

/**=================================Login===================================== */

routes.post("/session",SessionController.create);

 /** ==================================ong routes============================ */
routes.get("/ongs", OngControler.listAllOngs)
routes.post("/ongs", celebrate( {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
} ) ,OngControler.createOng);
/**=====================================Incident routes======================= */
routes.get( "/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}) , IncidentController.listAllIncidents );
routes.post( "/incidents", IncidentController.createIncident );

routes.delete( "/incidents/:id",
celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(), 
    [Segments.PARAMS]: Joi.object().keys({
         id: Joi.number().required(),
    })
}), IncidentController.deleteIncident);

/**======================================Profile ONGs routes================== */
routes.get( "/profile/",celebrate( {
    [Segments.HEADERS]: Joi.object({
        Authorization: Joi.string().required()
    }).unknown()
} ), ProfileController.list);


/** Depois dissoe exportamos um módulo 
 * para que possa ser consumido por outras partes 
 * da aplicação.
 */
module.exports = routes;