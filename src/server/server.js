require('dotenv').config({ path: './env/.env.production'});
const restify = require('restify');
const mongoose = require('mongoose');
const mongo_uri_builder = require('mongo-uri-builder');

const case_model = require('./routes/cases');

const db_uri = process.env.DB_URI_DATA + process.env.DB_NAME;
const split_uri = db_uri.split('/');
const db = split_uri[3];
const host = split_uri[2].split(':')[0];
const port = split_uri[2].split(':')[1];

const db_uri_data = mongo_uri_builder({
	username: process.env.DB_USER_DATA,
	password: process.env.DB_PASS_DATA,
	host: host,
	port: port,
	database: db
});

mongoose.connect(db_uri_data, { useNewUrlParser: true, useUnifiedTopology: true });

const server_options = {name: process.env.API_NAME}
const server = restify.createServer(server_options);

case_model(server);

server.listen(process.env.PORT, process.env.HOST, function() {
	console.log('%s listening at %s', server.name, server.url);
});
