const test = require('ava');
const got = require('got');
const m = require('../../../src/server/routes/cases');
const m_server = require('../../../src/server/server');

test('[STATIC] Testing cases call', async t => {
	await m_server.start('my_api', 'localhost', 55555);
	const response = await got('http://127.0.0.1:55555/cases?age_upper=30&age_lower=20');

	console.log(response);
});
