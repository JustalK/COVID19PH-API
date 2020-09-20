const test = require('ava');
const m = require('../src/db');

test('[DYNAMIC] Testing the search on the different website', async t => {
	await m.get_data();
	t.true(true);
});
