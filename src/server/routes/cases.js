const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename,'.js');
const dbs = require('../dbs/' + filename);
const services = require('../services/' + filename)(dbs);
const parameters = require('../libs/parameters');
const constants = require('../libs/consts');

function createRouter(server) {
  routes
    .use(server)
	.set('/cron/cases', 'GET', async function (req, res, next) {
		await services.create_cases('datas/COVID_PH_CASE.csv');
		res.send(constants.SUCCESS_CODE, {});
	})
    .set('/cases', 'GET', async function (req, res, next) {
		// Check the existence and parse the parameters
		const limit = parameters.check_limit_parameter(req.query.limit)
		const age_upper = parameters.check_number_parameter(req.query.age_upper);
		const age_lower = parameters.check_number_parameter(req.query.age_lower);
		const sex = parameters.check_sex_parameter(req.query.sex);
		const pregnant = parameters.check_boolean_parameter(req.query.pregnant);
		const quarantined = parameters.check_boolean_parameter(req.query.quarantined);
		const health = parameters.check_boolean_parameter(req.query.health);

		// Create the filters for every parameter available
		let filters = [];
		parameters.create_parameter(filters, 'age', [age_lower, age_upper], 'lower_upper');
		parameters.create_parameter(filters, 'age', age_upper, 'lower');
		parameters.create_parameter(filters, 'age', age_lower, 'upper');
		parameters.create_parameter(filters, 'sex', sex, 'equal');
		parameters.create_parameter(filters, 'pregnant', pregnant, 'equal');
		parameters.create_parameter(filters, 'quarantined', quarantined, 'equal');
		parameters.create_parameter(filters, 'health_status', health, 'equal');

		// Filter the filters for keeping only those valid
		filters = filters.filter(parameters.is_valid_parameter);
		const datas = await services.get_all(filters,null,limit);
		res.send(constants.SUCCESS_CODE, datas);
    })
}

module.exports = createRouter;
