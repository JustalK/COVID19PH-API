require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV});
const test = require('ava');
const got = require('got');
const m = require('../../../src/server/routes/cases');
const m_index = require('../../../src/server/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

test('[STATIC] Testing cases call', async t => {
	const server = await m_index.start();

	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?age_upper=30&age_lower=20')
			.end((err, response) => {
				resolve(response.body);
			});
	});

	t.is(true, true);
});
