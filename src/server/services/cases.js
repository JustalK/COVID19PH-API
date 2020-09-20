const path = require('path');
const filename = path.basename(__filename,'.js');
const dbs = require('../dbs/' + filename);

module.exports = {
	create: async data => {
		return dbs.create(data);
	},
	get_all: async () => {
		return dbs.getAll({});
	}
}
