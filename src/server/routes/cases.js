const routes = require('restify-route');
const path = require('path');
const filename = path.basename(__filename, '.js');
const dbs = require('../dbs/' + filename);
const services = require('../services/' + filename)(dbs);
const parameters = require('../libs/parameters');
const constants = require('../libs/consts');

const google = require('../libs/google');
const pdf = require('../libs/pdf');
const utils = require('../libs/utils');
const logs = require('../libs/logs');

function createRouter(server) {
	routes
		.use(server)
		.set('/', 'GET', async (request, response, next) => {
			const app = {name: process.env.API_NAME, status: 'RUNNING'};
			response.send(constants.SUCCESS_CODE, app);
		})
		.set('/cron/cases', 'GET', async (request, response, next) => {
			logs.info('Starting calling : /cron/cases');
			const doh_data_update_redirect_link = await utils.get_the_follow_link(constants.doh_data_update_link);
			logs.info(doh_data_update_redirect_link);
			const doh_data_update_folder_ID = google.get_folder_ID(doh_data_update_redirect_link);
			logs.info(doh_data_update_folder_ID);
			const doh_data_update_files_in_directory = await google.read_files_in_directory(doh_data_update_folder_ID);
			logs.info(doh_data_update_files_in_directory);
			const doh_data_update_file_ID = doh_data_update_files_in_directory[0].id;
			const doh_source = await google.download_file(doh_data_update_file_ID, process.env.CASES_CSV_PATH);
			const doh_folder_link = await pdf.get_DOH_folder_link(doh_source);
			logs.info(doh_folder_link);
			const doh_folder_redirect_link = await utils.get_the_follow_link(doh_folder_link);
			logs.info(doh_folder_redirect_link);
			const doh_folder_ID = google.get_folder_ID(doh_folder_redirect_link);
			logs.info(doh_folder_ID);
			const files_in_directory = await google.read_files_in_directory(doh_folder_ID);
			logs.info(files_in_directory);
			const covid_case_file = utils.get_covid_case_file(files_in_directory);
			logs.info(covid_case_file);
			const doh_case_file_ID = covid_case_file.id;
			logs.info(doh_case_file_ID);
			const cases = await google.download_file(doh_case_file_ID, process.env.CASES_CSV_PATH);
			logs.info('Starting to remove all the cases');
			await services.remove_all_cases();
			logs.info('All cases has been removed');
			await services.create_cases(process.env.CREATE_CASES_CSV_PATH);
			logs.info('All cases has been created');
			response.send(constants.SUCCESS_CODE, {});
		})
		.set('/cases', 'GET', async (request, response, next) => {
			const errors = {};
			// Check the existence and parse the parameters
			const limit = parameters.check_limit_parameter(request.query.limit, errors);
			const skip = parameters.check_number_parameter(request.query.skip, errors);
			const sort_key = parameters.check_enum_parameter(request.query.sort, await services.get_model_keys(), errors);
			const sort_order = parameters.check_enum_parameter(request.query.order, ['-1', '1'], errors);
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
			const sort = parameters.create_sort(sort_key, sort_order);
			const datas = Object.keys(errors).length === 0 ? await services.get_all(filters, sort, limit, skip) : errors;
			response.send(constants.SUCCESS_CODE, datas);
		})
		.set('/cases/total', 'GET', async (request, response, next) => {
			const total = await services.count_total_cases();
			response.send(constants.SUCCESS_CODE, {total_cases: total});
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
		});
}

module.exports = createRouter;
