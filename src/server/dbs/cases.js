const path = require('path');
const filename = path.basename(__filename,'.js');
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
	getAll: (find ,sort, limit) => {
		return model
			.find(find)
			.sort(sort)
	    	.limit(limit);
	}
}

module.exports = dbs;
