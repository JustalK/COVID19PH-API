const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');
const services = require('../services/' + filename);

function createRouter(server) {
  routes
    .use(server)
    .set('/cases', 'GET', async function (req, res, next) {
		const limit = req.query.limit ? Number(req.query.limit) : Number(process.env.CASES_LIMIT_GETTER);
		const upper_age = req.query.upper_age ? Number(req.query.upper_age) : null;
		const lower_age = req.query.lower_age ? Number(req.query.lower_age) : null;

		const filter = {}

		if (upper_age) {
			filter['age'] = {$lte: upper_age}
		}

		if (lower_age) {
			filter['age'] = {$gte: lower_age}
		}

		const datas = await services.get_all(filter,null,limit);
		res.send(200, datas);
    })
}

module.exports = createRouter;
