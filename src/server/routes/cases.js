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
			const limit = parameters.check_limit_parameter(request.query.limit, errors);
			const age = parameters.check_number_parameter(request.query.age, errors);
			const age_upper = parameters.check_number_parameter(request.query.age_upper, errors);
			const age_lower = parameters.check_number_parameter(request.query.age_lower, errors);
			const sex = parameters.check_enum_parameter(request.query.sex, await services.get_distinct('sex'), errors);
			const pregnant = parameters.check_boolean_parameter(request.query.pregnant, errors);
			const quarantined = parameters.check_boolean_parameter(request.query.quarantined, errors);
			const status = parameters.check_enum_parameter(request.query.status, await services.get_distinct('status'), errors);
			const city = parameters.check_enum_parameter(request.query.city, await services.get_distinct('city'), errors);
			const region = parameters.check_enum_parameter(request.query.region, await services.get_distinct('region'), errors);
			const date_start_case = parameters.check_date_parameter(request.query.date_start_case, errors);
			const date_start_case_before = parameters.check_date_parameter(request.query.date_start_case_before, errors);
			const date_start_case_after = parameters.check_date_parameter(request.query.date_start_case_after, errors);
			const date_result_release = parameters.check_date_parameter(request.query.date_result_release, errors);
			const date_result_release_before = parameters.check_date_parameter(request.query.date_result_release_before, errors);
			const date_result_release_after = parameters.check_date_parameter(request.query.date_result_release_after, errors);
			const date_result_positive = parameters.check_date_parameter(request.query.date_result_positive, errors);
			const date_result_positive_before = parameters.check_date_parameter(request.query.date_result_positive_before, errors);
			const date_result_positive_after = parameters.check_date_parameter(request.query.date_result_positive_after, errors);
			const date_recover = parameters.check_date_parameter(request.query.date_recover, errors);
			const date_recover_before = parameters.check_date_parameter(request.query.date_recover_before, errors);
			const date_recover_after = parameters.check_date_parameter(request.query.date_recover_after, errors);
			const date_died = parameters.check_date_parameter(request.query.date_died, errors);
			const date_died_before = parameters.check_date_parameter(request.query.date_died_before, errors);
			const date_died_after = parameters.check_date_parameter(request.query.date_died_after, errors);

			// Create the filters for every parameter available
			let filters = [];
			parameters.create_parameter(filters, 'age', [age_lower, age_upper], 'lower_upper');
			parameters.create_parameter(filters, 'age', age_lower, 'upper');
			parameters.create_parameter(filters, 'age', age_upper, 'lower');
			parameters.create_parameter(filters, 'age', age, 'equal');
			parameters.create_parameter(filters, 'sex', sex, 'equal');
			parameters.create_parameter(filters, 'pregnant', pregnant, 'equal');
			parameters.create_parameter(filters, 'quarantined', quarantined, 'equal');
			parameters.create_parameter(filters, 'status', status, 'equal');
			parameters.create_parameter(filters, 'city', city, 'equal');
			parameters.create_parameter(filters, 'region', region, 'equal');
			parameters.create_parameter(filters, 'date_start_case', [date_start_case_after, date_start_case_before], 'lower_upper');
			parameters.create_parameter(filters, 'date_start_case', date_start_case_before, 'upper');
			parameters.create_parameter(filters, 'date_start_case', date_start_case_after, 'lower');
			parameters.create_parameter(filters, 'date_start_case', date_start_case, 'equal');
			parameters.create_parameter(filters, 'date_result_release', [date_result_release_after, date_result_release_before], 'lower_upper');
			parameters.create_parameter(filters, 'date_result_release', date_result_release_before, 'upper');
			parameters.create_parameter(filters, 'date_result_release', date_result_release_after, 'lower');
			parameters.create_parameter(filters, 'date_result_release', date_result_release, 'equal');
			parameters.create_parameter(filters, 'date_result_positive', [date_result_positive_after, date_result_positive_before], 'lower_upper');
			parameters.create_parameter(filters, 'date_result_positive', date_result_positive_before, 'upper');
			parameters.create_parameter(filters, 'date_result_positive', date_result_positive_after, 'lower');
			parameters.create_parameter(filters, 'date_result_positive', date_result_positive, 'equal');
			parameters.create_parameter(filters, 'date_recover', [date_recover_after, date_recover_before], 'lower_upper');
			parameters.create_parameter(filters, 'date_recover', date_recover_before, 'upper');
			parameters.create_parameter(filters, 'date_recover', date_recover_after, 'lower');
			parameters.create_parameter(filters, 'date_recover', date_recover, 'equal');
			parameters.create_parameter(filters, 'date_died', [date_died_after, date_died_before], 'lower_upper');
			parameters.create_parameter(filters, 'date_died', date_died_before, 'upper');
			parameters.create_parameter(filters, 'date_died', date_died_after, 'lower');
			parameters.create_parameter(filters, 'date_died', date_died, 'equal');

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
