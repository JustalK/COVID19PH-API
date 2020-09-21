const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');
const services = require('../services/' + filename);

function createRouter(server) {
  routes
    .use(server)
    .set('/cases', 'GET', async function (req, res, next) {
		const limit = req.query.limit ? Number(req.query.limit) : Number(process.env.CASES_LIMIT_GETTER);
		const age_upper = req.query.age_upper ? Number(req.query.age_upper) : null;
		const age_lower = req.query.age_lower ? Number(req.query.age_lower) : null;
		const sex = req.query.sex ? req.query.sex : null;
		const pregnant = req.query.pregnant ? req.query.pregnant : null;

		const filter = {}

		if (age_upper) {
			filter['age'] = {$lte: age_upper}
		}

		if (age_lower) {
			filter['age'] = {$gte: age_lower}
		}

		if (sex) {
			filter['sex'] = {$eq: sex}
		}

		if(pregnant !== null) {
			filter['pregnant'] = (pregnant.toUpperCase() == 'TRUE');
		}

		const datas = await services.get_all(filter,null,limit);
		res.send(200, datas);
    })
}

module.exports = createRouter;
