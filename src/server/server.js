const restify = require('restify');

module.exports = {
	create_server: name => {
		const server_options = {name: name}
		const server = restify.createServer(server_options);
		server.use(restify.plugins.queryParser({mapParams: true}));
		return server;
	},
	adding_route: (filename_routes, server) => {
		const route = require('./routes/' + filename_routes);
		route(server);
	},
	start: (name, host, port) => {
		const server = module.exports.create_server(name);
		module.exports.adding_route('cases', server);

		server.listen(port, host, function() {
			console.log('%s listening at %s', server.name, server.url);
		});
	}
}
