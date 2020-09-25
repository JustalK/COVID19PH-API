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
		const pregnant = req.query.pregnant ? req.query.pregnant == 'TRUE' : null;
		const quarantined = req.query.quarantined ? req.query.quarantined == 'TRUE' : null;
		const health = req.query.health ? req.query.health == 'TRUE' : null;

		let filters = [];

		if(age_lower && age_upper) {
			filters.push(['age', [age_lower, age_upper], 'lower_upper']);
		} else {
			filters.push(['age', age_upper, 'lower']);
			filters.push(['age', age_lower, 'upper']);
		}

		filters.push(['sex', sex, 'equal']);
		filters.push(['pregnant', pregnant, 'equal']);
		filters.push(['quarantined', quarantined, 'equal']);
		filters.push(['health_status', health, 'equal']);

		filters = filters.filter(param => param[1]);
		const datas = await services.get_all(filters,null,limit);
		res.send(200, datas);
    })
}

module.exports = createRouter;
