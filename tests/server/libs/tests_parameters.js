require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV});
const test = require('ava');
const m = require('../../../src/server/libs/parameters');

test('[STATIC] Testing the limit check parameter with a number', t => {
	const limit = m.check_limit_parameter(3);
	t.is(limit, 3);
	const limit_2 = m.check_limit_parameter(56);
	t.is(limit_2, 56);
	const limit_3 = m.check_limit_parameter(1);
	t.is(limit_3, 1);
});

test('[STATIC] Testing the limit check parameter without an argument', t => {
	const limit = m.check_limit_parameter(null);
	t.is(limit, 1000);
});

test('[STATIC] Testing the number check parameter with a number', t => {
	const number = m.check_number_parameter(3);
	t.is(number, 3);
	const number_2 = m.check_number_parameter(56);
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter(1);
	t.is(number_3, 1);
});

test('[STATIC] Testing the number check parameter with a string number', t => {
	const number = m.check_number_parameter('3');
	t.is(number, 3);
	const number_2 = m.check_number_parameter('56.0');
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter('1');
	t.is(number_3, 1);
});

test('[STATIC] Testing the date check parameter with a good parameter', t => {
	const errors = {};
	const date = m.check_date_parameter('12/02/1991', errors);
	t.assert(date instanceof Date);
	const date_2 = m.check_date_parameter('06/26/2020', errors);
	t.assert(date_2 instanceof Date);
});

test('[STATIC] Testing the date check parameter with a wrong parameter', t => {
	const errors = {};
	const date = m.check_date_parameter('abc', errors);
	t.not(errors.abc, undefined);
});

test('[STATIC] Testing the number check parameter with a bad argument', t => {
	const errors = {};
	const number = m.check_number_parameter('dfd', errors);
	t.is(number, null);
	t.not(errors.dfd, undefined);
	const number_2 = m.check_number_parameter('abc', errors);
	t.is(number_2, null);
	t.not(errors.abc, undefined);
	const number_3 = m.check_number_parameter({}, errors);
	t.is(number_3, null);
});

test('[STATIC] Testing the number check parameter with a bad argument and default argument', t => {
	const errors = {};
	const number = m.check_number_parameter('dfd', errors, 12);
	t.is(number, 12);
	const number_2 = m.check_number_parameter('abc', errors, 150);
	t.is(number_2, 150);
	const number_3 = m.check_number_parameter({}, errors, 1000);
	t.is(number_3, 1000);
});

test('[STATIC] Testing the boolean check parameter with a string true', t => {
	const parameter = m.check_boolean_parameter('TRUE');
	t.is(parameter, true);
	const parameter_2 = m.check_boolean_parameter('true');
	t.is(parameter_2, true);
});

test('[STATIC] Testing the boolean check parameter with a number 1', t => {
	const parameter = m.check_boolean_parameter(1);
	t.is(parameter, true);
});

test('[STATIC] Testing the boolean check parameter with a number false 0', t => {
	const parameter = m.check_boolean_parameter(0);
	t.is(parameter, false);
});

test('[STATIC] Testing the boolean check parameter with a string false', t => {
	const parameter = m.check_boolean_parameter('FALSE');
	t.is(parameter, false);
	const parameter_2 = m.check_boolean_parameter('false');
	t.is(parameter_2, false);
});

test('[STATIC] Testing the boolean check parameter with a bad value', t => {
	const errors = {};
	const parameter = m.check_boolean_parameter(10, errors);
	t.is(parameter, null);
	t.not(errors[10], undefined);
	const parameter_2 = m.check_boolean_parameter(-3, errors);
	t.is(parameter_2, null);
	t.not(errors[-3], undefined);
	const parameter_3 = m.check_boolean_parameter('656', errors);
	t.is(parameter_3, null);
	t.not(errors['656'], undefined);
});

test('[STATIC] Testing the check parameter with a null argument', t => {
	const parameter = m.check_parameter(null, () => {});
	t.is(parameter, null);
});

test('[STATIC] Testing the is_valid_parameter', t => {
	const parameter = m.is_valid_parameter(['age', '0', ['eq']]);
	t.is(parameter, true);
	const parameter_2 = m.is_valid_parameter(['health', 'blabla bla bla', ['lte']]);
	t.is(parameter_2, true);
	const parameter_3 = m.is_valid_parameter(['health', [23, 15], ['lte']]);
	t.is(parameter_3, true);
});

test('[STATIC] Testing the is_valid_parameter with bad value', t => {
	const parameter = m.is_valid_parameter(['age', null, ['eq']]);
	t.is(parameter, false);
});

test('[STATIC] Testing the is_valid_parameter with not well formated array', t => {
	const parameter = m.is_valid_parameter(['age', '0']);
	t.is(parameter, false);
});

test('[STATIC] Testing the create_mongoose_parameters upper', t => {
	const parameter = m.create_mongoose_parameters(['age', 0, 'upper']);
	t.is(parameter.age.$lte, 0);
	const parameter_2 = m.create_mongoose_parameters(['ruby', 'test', 'upper']);
	t.is(parameter_2.ruby.$lte, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters lower', t => {
	const parameter = m.create_mongoose_parameters(['age', 0, 'lower']);
	t.is(parameter.age.$gte, 0);
	const parameter_2 = m.create_mongoose_parameters(['ruby', 'test', 'lower']);
	t.is(parameter_2.ruby.$gte, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters equal', t => {
	const parameter = m.create_mongoose_parameters(['age', 0, 'equal']);
	t.is(parameter.age.$eq, 0);
	const parameter_2 = m.create_mongoose_parameters(['ruby', 'test', 'equal']);
	t.is(parameter_2.ruby.$eq, 'test');
});

test('[STATIC] Testing the create_mongoose_parameters lower_upper', t => {
	const parameter = m.create_mongoose_parameters(['age', [12, 20], 'lower_upper']);
	t.is(parameter.age.$gte, 12);
	t.is(parameter.age.$lte, 20);
});

test('[STATIC] Testing the create_mongoose_parameters with a type that does not exist', t => {
	const parameter = m.create_mongoose_parameters(['age', 20, 'lsddsf']);
	t.is(parameter.age.$eq, 20);
});

test('[STATIC] Testing the create_parameter', t => {
	const filters = [];
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
