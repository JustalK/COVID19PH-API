const restify = require('restify');


module.exports = {
	adding_route: (filename_routes, server) => {
		const route = require('./routes/' + filename_routes);
		route(server);
	},
	start: () => {

		const server_options = {name: process.env.API_NAME}
		const server = restify.createServer(server_options);

		server.use(restify.plugins.queryParser({mapParams: true}));

		module.exports.adding_route('cases', server);

		server.listen(process.env.PORT, process.env.HOST, function() {
			console.log('%s listening at %s', server.name, server.url);
		});
	}
}
