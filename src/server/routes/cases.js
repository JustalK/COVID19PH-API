const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');
const services = require('../services/' + filename);
const parameters = require('../libs/parameters');

function createRouter(server) {
  routes
    .use(server)
    .set('/cases', 'GET', async function (req, res, next) {
		const limit = req.query.limit ? Number(req.query.limit) : Number(process.env.CASES_LIMIT_GETTER);
		const age_upper = parameters.check_number_parameter(req.query.age_upper);
		const age_lower = parameters.check_number_parameter(req.query.age_lower);
		const sex = parameters.check_sex_parameter(req.query.sex);
		const pregnant = parameters.check_boolean_parameter(req.query.pregnant);
		const quarantined = parameters.check_boolean_parameter(req.query.quarantined);
		const health = parameters.check_boolean_parameter(req.query.health);

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

		filters = filters.filter(parameters.is_valid_parameter);
		const datas = await services.get_all(filters,null,limit);
		res.send(200, datas);
    })
}

module.exports = createRouter;
