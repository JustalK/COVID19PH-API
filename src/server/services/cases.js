const path = require('path');
const filename = path.basename(__filename,'.js');
const models_cases = require('../models/cases');
const parameters = require('../libs/parameters');

module.exports = dbs => ({
	create_model: data => {
		return new models_cases(data);
	},
	create: async data => {
		return dbs.create(data);
	},
	create_many: async data => {
		return dbs.create_many(data);
	},
	get_all: async (filters, sort = null, limit = null) => {
		const filter_mongoose = filters.map(parameters.create_mongoose_parameters);
		const find = {$and: filter_mongoose};
		return dbs.getAll(find, sort, limit);
	}
})
