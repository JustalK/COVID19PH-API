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
