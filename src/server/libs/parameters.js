const constants = require('../libs/consts');

module.exports = {
	check_limit_parameter: (parameter, errors) => {
		return parameter ? module.exports.check_number_parameter(parameter, errors, Number(process.env.CASES_LIMIT_GETTER)) : Number(process.env.CASES_LIMIT_GETTER);
	},
	check_number_parameter: (parameter, errors, default_parameter = constants.no_parameter_found) => {
		return module.exports.check_parameter(parameter, parameter => {
			if (isNaN(parameter)) {
				errors[parameter] = 'This parameter is not a number.';
				return default_parameter;
			}

			return Number(parameter);
		});
	},
	check_date_parameter: (parameter, errors) => {
		return module.exports.check_parameter(parameter, parameter => {
			const date = new Date(parameter + ' 00:00:00');
			if (date instanceof Date && !isNaN(date.getTime())) {
				return date;
			}

			errors[parameter] = 'This parameter is not a date of the format : MM/DD/YYYY';
			return constants.no_parameter_found;
		});
	},
	check_boolean_parameter: (parameter, errors) => {
		return module.exports.check_parameter(parameter, parameter => {
			parameter = parameter.toString();
			const parameter_boolean_true = constants.TRUE_PARAMETERS.find(boolean => boolean === parameter.toUpperCase());
			if (parameter_boolean_true) {
				return true;
			}

			const parameter_boolean_false = constants.FALSE_PARAMETERS.find(boolean => boolean === parameter.toUpperCase());
			if (parameter_boolean_false) {
				return false;
			}

			errors[parameter] = 'This parameter does not exist. The only possible values are : ' + constants.TRUE_PARAMETERS.join(', ') + ' or ' + constants.FALSE_PARAMETERS.join(', ');
			return constants.no_parameter_found;
		});
	},
	check_enum_parameter: (parameter, enum_parameters, errors) => {
		return module.exports.check_parameter(parameter, parameter => {
			const parameter_enum = enum_parameters.find(value => value === parameter);
			if (parameter_enum === undefined) {
				errors[parameter] = 'This parameter does not exist. The only possible values are : ' + enum_parameters.join(', ');
			}

			return parameter_enum ? parameter_enum : constants.no_parameter_found;
		});
	},
	check_parameter: (parameter, fn) => {
		const parameter_exist = parameter === undefined || parameter === null ? null : parameter;
		if (parameter_exist === null) {
			return constants.no_parameter_found;
		}

		return fn(parameter);
	},
	is_valid_parameter: parameter => {
		if (parameter.length !== 3) {
			return false;
		}

		if (parameter[2] === 'lower_upper') {
			return parameter[1][0] !== null && parameter[1][1] !== null;
		}

		return parameter[1] !== null;
	},
	create_parameter: (filters, key, value, mongoose_filter) => {
		const find = filters.find(filter => filter[0] === key && filter[1] !== null && filter[1][0] !== null && filter[1][1] !== null && filter[2] === 'lower_upper');
		return find ? null : filters.push([key, value, mongoose_filter]);
	},
	create_sort: (sort_key, sort_order) => {
		if (sort_key === null || sort_order === null) {
			return null;
		}

		return {[sort_key]: sort_order};
	},
	create_mongoose_parameters: filter => {
		switch (filter[2]) {
			case 'lower_upper':
				return {[filter[0]]: {$gte: filter[1][0], $lte: filter[1][1]}};
			case 'lower':
				return {[filter[0]]: {$gte: filter[1]}};
			case 'upper':
				return {[filter[0]]: {$lte: filter[1]}};
			case 'equal':
				return {[filter[0]]: {$eq: filter[1]}};
			default:
				return {[filter[0]]: {$eq: filter[1]}};
		}
	}
};
