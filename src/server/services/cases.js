const path = require('path');
const filename = path.basename(__filename,'.js');
const dbs = require('../dbs/' + filename);
const models_cases = require('../models/cases');
const parameters = require('../libs/parameters');

module.exports = {
	create_model: data => {
		return new models_cases(data);
	},
	create: async data => {
		return dbs.create(data);
	},
	create_many: async data => {
		return dbs.create_many(data);
	},
	get_all: async (filters, sort, limit) => {
		const filter_mongoose = filters.map(parameters.create_mongoose_parameters);
		const find = {$and: filter_mongoose};
		console.log(find);
		return dbs.getAll(find, sort, limit);
	}
}
