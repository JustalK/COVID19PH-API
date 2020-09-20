const path = require('path');
const filename = path.basename(__filename,'.js');
const dbs = require('../dbs/' + filename);

module.exports = {
	get_all: async () => {
		return dbs.getAll({});
	}
}
