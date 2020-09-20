require('dotenv').config({ path: './env/.env.production'});
const restify = require('restify');

const server_options = {name: process.env.API_NAME}
const server = restify.createServer(server_options);
server.listen(process.env.PORT, process.env.HOST, function() {
	console.log('%s listening at %s', server.name, server.url);
});
