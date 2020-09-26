const mongoose = require('mongoose');
const mongo_uri_builder = require('mongo-uri-builder');

module.exports = {
	parse_db_uri: () => {
		db_uri = process.env.DB_URI_DATA + process.env.DB_NAME;
		split_uri = db_uri.split('/');

		const db_data = {};
		db_data.db = split_uri[3];
		db_data.host = split_uri[2].split(':')[0];
		db_data.port = split_uri[2].split(':')[1];
		db_data.username = process.env.DB_USER_DATA;
		db_data.password = process.env.DB_PASS_DATA;

		return db_data;
	},
	create_mongo_uri: db_data => {
		return mongo_uri_builder({
			username: db_data.username,
			password: db_data.password,
			host: db_data.host,
			port: db_data.port,
			database: db_data.db
		});
	},
	mongoose_connect: () => {
		const db_data = module.exports.parse_db_uri();
		const db_uri_data = module.exports.create_mongo_uri(db_data);

		mongoose.connect(db_uri_data, {useNewUrlParser: true, useUnifiedTopology: true});
	}
}