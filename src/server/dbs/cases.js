const path = require('path');
const filename = path.basename(__filename, '.js');
const model = require('../models/' + filename);

const dbs = {
	create: data => {
		return model
		.create(data);
	},
	create_many: datas => {
		return model
		.insertMany(datas);
	},
	get_all: (find, sort, limit) => {
		return model
		.find(find)
		.sort(sort)
		.limit(limit);
	},
	get_distinct: (field) => {
		return model.aggregate([
			{
				$group: {
					_id: '$' + field
				}
			},
			{
				$group: {
					_id: 'RESULT',
					rsl: { $push : "$_id" }
				}
			}
		])
	}
};

module.exports = dbs;
