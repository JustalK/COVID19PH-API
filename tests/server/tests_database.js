const test = require('ava');
const m = require('../../src/server/database');

test('[STATIC] Testing parse_db_uri', async t => {
	const db_data = m.parse_db_uri('my_database', 'mongodb://localhost:27017/', 'robert', 'qwerty')

	t.is(db_data.db, 'my_database');
	t.is(db_data.host, 'localhost');
	t.is(db_data.port, '27017');
	t.is(db_data.username, 'robert');
	t.is(db_data.password, 'qwerty');
});
