require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV});
const test = require('ava');
const got = require('got');
const m = require('../../../src/server/routes/cases');
const m_index = require('../../../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server;

test.before(async () => {
	server = await m_index.start();
});

test.serial('[STATIC] Testing the cron that remove the actual cases and add the new data from the csv', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cron/cases')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
});

test('[STATIC] Testing cases call get all without argument', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?limit=3')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.length, 3);
	// First cases
	t.is(datas[0].case_code, 'VFDV6655');
	t.is(datas[0].age, 22);
	t.is(datas[0].sex, 'M');
	t.not(datas[0].date_start_case, undefined);
	t.not(datas[0].date_result_release, undefined);
	t.not(datas[0].date_result_positive, undefined);
	t.not(datas[0].date_recover, undefined);
	t.not(datas[0].date_died, undefined);
	t.is(datas[0].status, 'DIED');
	t.is(datas[0].quarantined, true);
	t.is(datas[0].pregnant, false);
	t.is(datas[0].region, 'RIZAL');
	t.is(datas[0].city, 'MANILA');
	// Second cases
	t.is(datas[1].case_code, 'VF54564');
	t.is(datas[1].age, 23);
	t.is(datas[1].sex, 'M');
	t.not(datas[1].date_start_case, undefined);
	t.not(datas[1].date_result_release, undefined);
	t.not(datas[1].date_result_positive, undefined);
	t.not(datas[1].date_recover, undefined);
	t.not(datas[1].date_died, undefined);
	t.is(datas[1].status, 'RECOVERED');
	t.is(datas[1].quarantined, false);
	t.is(datas[1].pregnant, true);
	t.is(datas[1].region, 'RIZAL');
	t.is(datas[1].city, 'CAINTA');
	// Third cases
	t.is(datas[2].case_code, 'SD6555');
	t.is(datas[2].age, 18);
	t.is(datas[2].sex, 'F');
	t.not(datas[2].date_start_case, undefined);
	t.not(datas[2].date_result_release, undefined);
	t.not(datas[2].date_result_positive, undefined);
	t.not(datas[2].date_recover, undefined);
	t.is(datas[2].date_died, undefined);
	t.is(datas[2].status, 'RECOVERED');
	t.is(datas[2].quarantined, true);
	t.is(datas[2].pregnant, true);
	t.is(datas[2].region, 'RIZAL');
	t.is(datas[2].city, 'CAINTA');
});

test('[STATIC] Testing cases call get all with a skip', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?skip=2')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.length, 1);
	// Third cases after skipping two
	t.is(datas[0].case_code, 'SD6555');
	t.is(datas[0].age, 18);
	t.is(datas[0].sex, 'F');
	t.not(datas[0].date_start_case, undefined);
	t.not(datas[0].date_result_release, undefined);
	t.not(datas[0].date_result_positive, undefined);
	t.not(datas[0].date_recover, undefined);
	t.is(datas[0].date_died, undefined);
	t.is(datas[0].status, 'RECOVERED');
	t.is(datas[0].quarantined, true);
	t.is(datas[0].pregnant, true);
	t.is(datas[0].region, 'RIZAL');
	t.is(datas[0].city, 'CAINTA');
});

test('[STATIC] Testing cases call get all with age parameter', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?age_upper=22&age_lower=16')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.length, 2);
	// First Result
	t.is(datas[0].case_code, 'VFDV6655');
	t.is(datas[0].age, 22);
	t.is(datas[0].sex, 'M');
	t.not(datas[0].date_start_case, undefined);
	t.not(datas[0].date_result_release, undefined);
	t.not(datas[0].date_result_positive, undefined);
	t.not(datas[0].date_recover, undefined);
	t.not(datas[0].date_died, undefined);
	t.is(datas[0].status, 'DIED');
	t.is(datas[0].quarantined, true);
	t.is(datas[0].pregnant, false);
	t.is(datas[0].region, 'RIZAL');
	t.is(datas[0].city, 'MANILA');
	// Second Result
	t.is(datas[1].case_code, 'SD6555');
	t.is(datas[1].age, 18);
	t.is(datas[1].sex, 'F');
	t.not(datas[1].date_start_case, undefined);
	t.not(datas[1].date_result_release, undefined);
	t.not(datas[1].date_result_positive, undefined);
	t.not(datas[1].date_recover, undefined);
	t.is(datas[1].date_died, undefined);
	t.is(datas[1].status, 'RECOVERED');
	t.is(datas[1].quarantined, true);
	t.is(datas[1].pregnant, true);
	t.is(datas[1].region, 'RIZAL');
	t.is(datas[1].city, 'CAINTA');
});

test('[STATIC] Testing cases call get all with pregnant and quarantined parameter', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?pregnant=true&quarantined=true')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.length, 1);
	// First Result
	t.is(datas[0].case_code, 'SD6555');
	t.is(datas[0].age, 18);
	t.is(datas[0].sex, 'F');
	t.not(datas[0].date_start_case, undefined);
	t.not(datas[0].date_result_release, undefined);
	t.not(datas[0].date_result_positive, undefined);
	t.not(datas[0].date_recover, undefined);
	t.is(datas[0].date_died, undefined);
	t.is(datas[0].status, 'RECOVERED');
	t.is(datas[0].quarantined, true);
	t.is(datas[0].pregnant, true);
	t.is(datas[0].region, 'RIZAL');
	t.is(datas[0].city, 'CAINTA');
});

test('[STATIC] Testing cases call get all with pregnant and quarantined and age 20 parameter', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?pregnant=true&quarantined=true&age=20')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.length, 0);
});

test('[STATIC] Testing cases call get all with a parameter error', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases?age=a')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.not(datas.a, undefined);
});

test('[STATIC] Testing counting all cases', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases/total')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas.total_cases, 3);
});

test('[STATIC] Testing cases call get all with cities available', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases/cities/available')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas[0], 'CAINTA');
	t.is(datas[1], 'MANILA');
});

test('[STATIC] Testing cases call get all with regions available', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases/regions/available')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas[0], 'RIZAL');
});

test('[STATIC] Testing cases call get all with status available', async t => {
	const response = await new Promise((resolve, reject) => {
		chai.request(server).get('/cases/status/available')
			.end((err, response) => {
				resolve(response);
			});
	});

	t.is(response.status, 200);
	const datas = response.body;
	t.is(datas[0], 'RECOVERED');
	t.is(datas[1], 'DIED');
});
