const path = require('path');
const filename = path.basename(__filename,'.js');
const dbs = require('../dbs/' + filename);
const models_cases = require('../models/cases');

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
		const find = {};
		filters.map(filter => {
			if(filter[2] == 'lower') {
				find[filter[0]] = {$gte: filter[1]};
			}

			if(filter[2] == 'upper') {
				find[filter[0]] = {$lte: filter[1]};
			}

			if(filter[2] == 'equal') {
				find[filter[0]] = {$eq: filter[1]};
			}
		})
		return dbs.getAll(find, sort, limit);
	}
}
