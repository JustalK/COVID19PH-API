const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');
const services = require('../services/' + filename);

function createRouter(server) {
  routes
    .use(server)
    .set('/cron/cases', 'GET', async function (req, res, next) {
		await services.create_cases();
		res.send(200, {});
    })
}

module.exports = createRouter;
