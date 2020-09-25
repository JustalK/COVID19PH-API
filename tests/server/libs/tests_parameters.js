const test = require('ava');
const m = require('../../../src/server/libs/parameters');

test('[STATIC] Testing the limit check parameter with a number', async t => {
	const limit = m.check_limit_parameter(3);
	t.is(limit, 3);
	const limit_2 = m.check_limit_parameter(56);
	t.is(limit_2, 56);
	const limit_3 = m.check_limit_parameter(1);
	t.is(limit_3, 1);
});

test('[STATIC] Testing the number check parameter with a number', async t => {
	const number = m.check_number_parameter(3);
	t.is(number, 3);
	const number_2 = m.check_number_parameter(56.0);
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter(1);
	t.is(number_3, 1);
});

test('[STATIC] Testing the number check parameter with a string number', async t => {
	const number = m.check_number_parameter('3');
	t.is(number, 3);
	const number_2 = m.check_number_parameter('56.0');
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter('1');
	t.is(number_3, 1);
});

test('[STATIC] Testing the number check parameter with a bad argument', async t => {
	const number = m.check_number_parameter('dfd');
	t.is(number, null);
	const number_2 = m.check_number_parameter('abc');
	t.is(number_2, null);
	const number_3 = m.check_number_parameter({});
	t.is(number_3, null);
});

test('[STATIC] Testing the number check parameter with a bad argument and default argument', async t => {
	const number = m.check_number_parameter('dfd', 12);
	t.is(number, 12);
	const number_2 = m.check_number_parameter('abc', 150);
	t.is(number_2, 150);
	const number_3 = m.check_number_parameter({}, 1000);
	t.is(number_3, 1000);
});

test('[STATIC] Testing the boolean check parameter with a string true', async t => {
	const param = m.check_boolean_parameter('TRUE');
	t.is(param, true);
	const param_2 = m.check_boolean_parameter('true');
	t.is(param_2, true);
});

test('[STATIC] Testing the boolean check parameter with a number 1', async t => {
	const param = m.check_boolean_parameter(1);
	t.is(param, true);
});

test('[STATIC] Testing the boolean check parameter with a number false 0', async t => {
	const param = m.check_boolean_parameter(0);
	t.is(param, false);
});

test('[STATIC] Testing the boolean check parameter with a string false', async t => {
	const param = m.check_boolean_parameter('FALSE');
	t.is(param, false);
	const param_2 = m.check_boolean_parameter('false');
	t.is(param_2, false);
});

test('[STATIC] Testing the boolean check parameter with a bad value', async t => {
	const param = m.check_boolean_parameter(10);
	t.is(param, null);
	const param_2 = m.check_boolean_parameter(-3);
	t.is(param_2, null);
	const param_3 = m.check_boolean_parameter('656');
	t.is(param_3, null);
});

test('[STATIC] Testing the sex check parameter with a M', async t => {
	const param = m.check_sex_parameter('M');
	t.is(param, 'M');
});

test('[STATIC] Testing the sex check parameter with a F', async t => {
	const param = m.check_sex_parameter('F');
	t.is(param, 'F');
});

test('[STATIC] Testing the sex check parameter with a bad value', async t => {
	const param = m.check_sex_parameter('Z');
	t.is(param, null);
	const param_2 = m.check_sex_parameter('MF');
	t.is(param_2, null);
});

test('[STATIC] Testing the is_valid_parameter', async t => {
	const param = m.is_valid_parameter(['age', '0', ['eq']]);
	t.is(param, true);
	const param_2 = m.is_valid_parameter(['health', 'blabla bla bla', ['lte']]);
	t.is(param_2, true);
	const param_3 = m.is_valid_parameter(['health', [23, 15], ['lte']]);
	t.is(param_3, true);
});

test('[STATIC] Testing the is_valid_parameter with bad value', async t => {
	const param = m.is_valid_parameter(['age', null, ['eq']]);
	t.is(param, false);
});

test('[STATIC] Testing the is_valid_parameter with not well formated array', async t => {
	const param = m.is_valid_parameter(['age', '0']);
	t.is(param, false);
});

test('[STATIC] Testing the create_mongoose_parameters upper', async t => {
	const param = m.create_mongoose_parameters(['age', 0, 'upper']);
	t.is(param.age.$lte, 0);
	const param_2 = m.create_mongoose_parameters(['ruby', 'test', 'upper']);
	t.is(param_2.ruby.$lte, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters lower', async t => {
	const param = m.create_mongoose_parameters(['age', 0, 'lower']);
	t.is(param.age.$gte, 0);
	const param_2 = m.create_mongoose_parameters(['ruby', 'test', 'lower']);
	t.is(param_2.ruby.$gte, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters equal', async t => {
	const param = m.create_mongoose_parameters(['age', 0, 'equal']);
	t.is(param.age.$eq, 0);
	const param_2 = m.create_mongoose_parameters(['ruby', 'test', 'equal']);
	t.is(param_2.ruby.$eq, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters lower_upper', async t => {
	const param = m.create_mongoose_parameters(['age', [12, 20], 'lower_upper']);
	t.is(param.age.$gte, 12);
	t.is(param.age.$lte, 20);
});

test('[STATIC] Testing the create_parameter', async t => {
	let filters = [];
	t.is(filters.length, 0);
	m.create_parameter(filters, 'sex', 'M', 'equal');
	t.is(filters.length, 1);
	t.is(filters[0][0], 'sex');
	t.is(filters[0][1], 'M');
	t.is(filters[0][2], 'equal');
	m.create_parameter(filters, 'age', [0, 20], 'lower_upper');
	t.is(filters.length, 2);
	t.is(filters[1][0], 'age');
	t.is(filters[1][1][0], 0);
	t.is(filters[1][1][1], 20);
	t.is(filters[1][2], 'lower_upper');
	m.create_parameter(filters, 'age', 20, 'lower');
	t.is(filters.length, 2);
});
