const test = require('ava');
const dbs = {
	create: data => {
		return data;
	},
	create_many: datas => {
		return datas;
	},
	get_all: (find, sort, limit) => {
		return [find, sort, limit];
	}
};
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
		status: 'DIED',
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
	t.is(a_case.status, 'DIED');
	t.is(a_case.quarantined, false);
	t.is(a_case.pregnant, false);
	t.is(a_case.region, 'RIZAL');
	t.is(a_case.city, 'ANTIPOLO');
});

test('[STATIC] Testing the services create dbs', async t => {
	const data = {case_code: 'CC123C'};
	const a_case = await m.create(data);
	t.is(a_case.case_code, 'CC123C');
});

test('[STATIC] Testing the services create many dbs', async t => {
	const data = [{case_code: 'CC123C'}, {case_code: 'CC1895C'}];
	const many_cases = await m.create_many(data);
	t.is(many_cases[0].case_code, 'CC123C');
	t.is(many_cases[1].case_code, 'CC1895C');
});

test('[STATIC] Testing the services get_all dbs', async t => {
	const prepare_query = await m.get_all([['age', 20, 'lower'], ['sex', 'M', 'equal']]);
	t.is(prepare_query[0].$and[0].age.$gte, 20);
	t.is(prepare_query[0].$and[1].sex.$eq, 'M');
});

test('[STATIC] Testing the cluster_create_many', async t => {
	const date = new Date();
	const clusters = await m.cluster_create_many([[{
		case_code: 'CL1C123C',
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
	}], [{
		case_code: 'CL2C123C',
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
	}]]);
	t.is(clusters.length, 2);
	t.is(clusters[0][0].case_code, 'CL1C123C');
	t.is(clusters[1][0].case_code, 'CL2C123C');
});

test('[STATIC] Testing the create_cluster', t => {
	let clusters = m.create_cluster([], {case_code: 'JSDJ65461'}, 2);
	t.is(clusters.length, 1);
	t.is(clusters[0].length, 1);
	t.is(clusters[0][0].case_code, 'JSDJ65461');
	clusters = m.create_cluster(clusters, {case_code: 'JSDDSFKL546'}, 2);
	t.is(clusters.length, 1);
	t.is(clusters[0].length, 2);
	t.is(clusters[0][0].case_code, 'JSDJ65461');
	t.is(clusters[0][1].case_code, 'JSDDSFKL546');
	clusters = m.create_cluster(clusters, {case_code: 'SDDVD56465'}, 2);
	t.is(clusters.length, 2);
	t.is(clusters[0].length, 2);
	t.is(clusters[1].length, 1);
	t.is(clusters[0][0].case_code, 'JSDJ65461');
	t.is(clusters[0][1].case_code, 'JSDDSFKL546');
	t.is(clusters[1][0].case_code, 'SDDVD56465');
});

test('[STATIC] Testing the create_cluster with error on first parameter', t => {
	const clusters = m.create_cluster(null, {case_code: 'JSDJ65461'});
	t.is(clusters, null);
});

test('[STATIC] Testing the create_cluster with error on second parameter', t => {
	const clusters = m.create_cluster([], null);
	t.is(clusters, null);
});

test('[STATIC] Testing the create_cluster with first parameter not array', t => {
	const clusters = m.create_cluster('aaa', {case_code: 'JS51651'});
	t.is(clusters.length, 1);
	t.is(clusters[0].length, 1);
	t.is(clusters[0][0].case_code, 'JS51651');
});

test('[STATIC] Testing the create_data_from_row', async t => {
	const date = new Date();
	const row = {
		CaseCode: 'CC123C',
		Age: 22,
		Sex: 'MALE',
		DateSpecimen: date,
		DateResultRelease: date,
		DateRepConf: date,
		DateRecover: date,
		DateDied: date,
		HealthStatus: 'DIED',
		Quarantined: false,
		Pregnanttab: false,
		RegionRes: 'RIZAL',
		CityMunRes: 'ANTIPOLO'
	};
	const data = await m.create_data_from_row(row);
	t.is(data.case_code, 'CC123C');
	t.is(data.age, 22);
	t.is(data.sex, 'M');
	t.is(data.date_start_case, date);
	t.is(data.date_result_release, date);
	t.is(data.date_result_positive, date);
	t.is(data.date_recover, date);
	t.is(data.date_died, date);
	t.is(data.status, 'DIED');
	t.is(data.quarantined, false);
	t.is(data.pregnant, false);
	t.is(data.region, 'RIZAL');
	t.is(data.city, 'ANTIPOLO');
});

test('[STATIC] Testing the create_cases', async t => {
	const clusters = await m.create_cases('tests/datas/TEST_COVID19.csv');
	t.is(clusters.number_clusters, 1);
	t.is(clusters.number_cases, 3);
	t.is(clusters.first_clusters[0].case_code, 'VFDV6655');
	t.is(clusters.first_clusters[0].age, 22);
	t.is(clusters.first_clusters[0].sex, 'M');
	t.is(clusters.first_clusters[1].case_code, 'VF54564');
	t.is(clusters.first_clusters[1].age, 23);
	t.is(clusters.first_clusters[1].sex, 'M');
	t.is(clusters.first_clusters[2].case_code, 'SD6555');
	t.is(clusters.first_clusters[2].age, 18);
	t.is(clusters.first_clusters[2].sex, 'F');
});
