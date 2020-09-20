const path = require('path');
const filename = path.basename(__filename,'.js');
const model = require('../models/' + filename);

const dbs = {
	getAll: function (find ,sort, limit) {
		return model
			.find(find)
			.sort(sort)
	    	.limit(limit);
	}
}

module.exports = dbs;
