/** Importamos o express */
const express = require('express');

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
routes.post("/ongs", OngControler.createOng);
/**=====================================Incident routes======================= */
routes.get( "/incidents", IncidentController.listAllIncidents );
routes.post( "/incidents", IncidentController.createIncident );
routes.delete( "/incidents/:id", IncidentController.deleteIncident);

routes.get( "/profile/", ProfileController.list);


/** Depois dissoe exportamos um módulo 
 * para que possa ser consumido por outras partes 
 * da aplicação.
 */
module.exports = routes;