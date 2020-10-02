const path = require('path');
const filename = path.basename(__filename, '.js');
const model = require('../models/' + filename);

const dbs = {
	create_many: datas => {
		return model
			.insertMany(datas);
	},
	remove_many: find => {
		return model
			.deleteMany(find);
	},
	get_all: (find, sort, limit, skip) => {
		return model
			.find(find)
			.sort(sort)
			.skip(skip)
			.limit(limit);
	},
	count: find => {
		return model
			.estimatedDocumentCount(find);
	},
	get_distinct: field => {
		return model.aggregate([
			{
				$group: {
					_id: '$' + field
				}
			},
			{
				$group: {
					_id: 'RESULT',
					rsl: {$push: '$_id'}
				}
			}
		]);
	}
};

module.exports = dbs;
