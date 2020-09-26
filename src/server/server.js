const restify = require('restify');


module.exports = {
	start: () => {
		const routes_cases = require('./routes/cases');

		const server_options = {name: process.env.API_NAME}
		const server = restify.createServer(server_options);

		server.use(restify.plugins.queryParser({mapParams: true}));

		routes_cases(server);

		server.listen(process.env.PORT, process.env.HOST, function() {
			console.log('%s listening at %s', server.name, server.url);
		});
	}
}
