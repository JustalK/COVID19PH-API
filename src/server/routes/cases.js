const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../dbs/' + filename);
const services = require('../services/' + filename)(dbs);
const parameters = require('../libs/parameters');
const constants = require('../libs/consts');

function createRouter(server) {
	routes
		.use(server)
		.set('/cron/cases', 'GET', async (request, response, next) => {
			await services.remove_all_cases();
			await services.create_cases('datas/COVID_PH_CASE.csv');
			response.send(constants.SUCCESS_CODE, {});
		})
		.set('/cases', 'GET', async (request, response, next) => {
			const errors = {};
			// Check the existence and parse the parameters
			const limit = parameters.check_limit_parameter(request.query.limit);
			const age_upper = parameters.check_number_parameter(request.query.age_upper);
			const age_lower = parameters.check_number_parameter(request.query.age_lower);
			const age = parameters.check_number_parameter(request.query.age);
			const sex = parameters.check_enum_parameter(request.query.sex, await services.get_distinct('sex'), errors);
			const pregnant = parameters.check_boolean_parameter(request.query.pregnant);
			const quarantined = parameters.check_boolean_parameter(request.query.quarantined);
			const status = parameters.check_enum_parameter(request.query.status, await services.get_distinct('status'), errors);

			// Create the filters for every parameter available
			let filters = [];
			parameters.create_parameter(filters, 'age', [age_lower, age_upper], 'lower_upper');
			parameters.create_parameter(filters, 'age', age_upper, 'lower');
			parameters.create_parameter(filters, 'age', age_lower, 'upper');
			parameters.create_parameter(filters, 'age', age, 'equal');
			parameters.create_parameter(filters, 'sex', sex, 'equal');
			parameters.create_parameter(filters, 'pregnant', pregnant, 'equal');
			parameters.create_parameter(filters, 'quarantined', quarantined, 'equal');
			parameters.create_parameter(filters, 'status', status, 'equal');

			// Filter the filters for keeping only those valid
			filters = filters.filter(parameters.is_valid_parameter);
			const datas = Object.keys(errors).length === 0 ? await services.get_all(filters, null, limit) : errors;
			response.send(constants.SUCCESS_CODE, datas);
		})
		.set('/cases/cities/available', 'GET', async (request, response, next) => {
			const datas = await services.get_distinct('city');
			response.send(constants.SUCCESS_CODE, datas);
		})
		.set('/cases/regions/available', 'GET', async (request, response, next) => {
			const datas = await services.get_distinct('region');
			response.send(constants.SUCCESS_CODE, datas);
		})
		.set('/cases/status/available', 'GET', async (request, response, next) => {
			const datas = await services.get_distinct('status');
			response.send(constants.SUCCESS_CODE, datas);
		})
}

module.exports = createRouter;
