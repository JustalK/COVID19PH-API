const test = require('ava');
const m = require('../../src/server/server');

test('[STATIC] Testing create_server with correct value', t => {
	const server = m.create_server('my_api');

	t.is(typeof server, 'object');
	t.is(server.name, 'my_api');
	t.not(server.server, undefined);
});

test('[STATIC] Checking create_server does not have any routes', t => {
	const server = m.create_server('my_api');

	const routes = server.router._registry._routes;
	t.is(Object.keys(routes).length, 0);
});

test('[STATIC] Testing adding_route with cases and correct value', t => {
	const server = m.create_server('my_api');
	m.adding_route('cases', server);

	const routes = server.router._registry._routes;
	t.not(routes.getcases, undefined);
	t.is(routes.getcases.method, 'GET');
	t.is(routes.getcases.path, '/cases');
});

test('[STATIC] Testing server start', async t => {
	const start = await m.start('my_api', 'localhost', '55555');
	t.is(start, true);
});
