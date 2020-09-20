const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');

function createRouter(server) {
  routes
    .use(server)
    .set('/cases', 'GET', async function (req, res, next) {
		res.send(200,{result: true});
    })
}

module.exports = createRouter;
