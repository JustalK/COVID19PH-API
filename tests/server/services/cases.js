const test = require('ava');
const m = require('../../../src/server/services/cases')('test');

test('[STATIC] Testing the services create model with perfect data', async t => {
	const date = new Date();
	const a_case = m.create_model({
		case_code: 'CC123C',
		age: 22,
		sex: 'M',
		date_start_case: date,
		date_result_release: date,
		date_result_positive: date,
		date_recover: date,
		date_died: date,
		health_status: 'DIED',
		quarantined: false,
		pregnant: false,
		region: 'RIZAL',
		city: 'ANTIPOLO'
	});
	t.is(a_case.case_code, 'CC123C');
	t.is(a_case.age, 22);
	t.is(a_case.sex, 'M');
	t.is(a_case.date_start_case, date);
	t.is(a_case.date_result_release, date);
	t.is(a_case.date_result_positive, date);
	t.is(a_case.date_recover, date);
	t.is(a_case.date_died, date);
	t.is(a_case.health_status, 'DIED');
	t.is(a_case.quarantined, false);
	t.is(a_case.pregnant, false);
	t.is(a_case.region, 'RIZAL');
	t.is(a_case.city, 'ANTIPOLO');
});
