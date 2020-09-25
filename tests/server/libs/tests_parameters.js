const test = require('ava');
const m = require('../../../src/server/libs/parameters');

test('[DYNAMIC] Testing the limit check parameter with a number', async t => {
	const limit = m.check_limit_parameter(3);
	t.is(limit, 3);
	const limit_2 = m.check_limit_parameter(56);
	t.is(limit_2, 56);
	const limit_3 = m.check_limit_parameter(1);
	t.is(limit_3, 1);
});

test('[DYNAMIC] Testing the number check parameter with a number', async t => {
	const number = m.check_number_parameter(3);
	t.is(number, 3);
	const number_2 = m.check_number_parameter(56.0);
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter(1);
	t.is(number_3, 1);
});

test('[DYNAMIC] Testing the number check parameter with a string number', async t => {
	const number = m.check_number_parameter('3');
	t.is(number, 3);
	const number_2 = m.check_number_parameter('56.0');
	t.is(number_2, 56);
	const number_3 = m.check_number_parameter('1');
	t.is(number_3, 1);
});

test('[DYNAMIC] Testing the number check parameter with a bad argument', async t => {
	const number = m.check_number_parameter('dfd');
	t.is(number, null);
	const number_2 = m.check_number_parameter('abc');
	t.is(number_2, null);
	const number_3 = m.check_number_parameter({});
	t.is(number_3, null);
});

test('[DYNAMIC] Testing the number check parameter with a bad argument and default argument', async t => {
	const number = m.check_number_parameter('dfd', 12);
	t.is(number, 12);
	const number_2 = m.check_number_parameter('abc', 150);
	t.is(number_2, 150);
	const number_3 = m.check_number_parameter({}, 1000);
	t.is(number_3, 1000);
});
