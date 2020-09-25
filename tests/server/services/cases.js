const test = require('ava');
const dbs = {
	create: data => {
		return data;
	},
	create_many: datas => {
		return datas;
	},
	getAll: (find, sort, limit) => {
		return [find, sort, limit];
	}
}
const m = require('../../../src/server/services/cases')(dbs);

test('[STATIC] Testing the services create model with perfect data', async t => {
	const date = new Date();
	const a_case = await m.create_model({
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

test('[STATIC] Testing the services create dbs', async t => {
	const data = {case_code: 'CC123C'}
	const a_case = await m.create(data);
	t.is(a_case.case_code, 'CC123C');
});

test('[STATIC] Testing the services create many dbs', async t => {
	const data = [{case_code: 'CC123C'},{case_code: 'CC1895C'}]
	const many_cases = await m.create_many(data);
	t.is(many_cases[0].case_code, 'CC123C');
	t.is(many_cases[1].case_code, 'CC1895C');
});

test('[STATIC] Testing the services get_all dbs', async t => {
	const prepare_query = await m.get_all([['age', 20, 'lower'], ['sex', 'M', 'equal']]);
	t.is(prepare_query[0].$and[0].age.$gte, 20);
	t.is(prepare_query[0].$and[1].sex.$eq, 'M');
});
