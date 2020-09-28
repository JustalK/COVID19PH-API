const constants = require('../libs/consts');

module.exports = {
	check_limit_parameter: parameter => {
		return parameter ? module.exports.check_number_parameter(parameter, Number(process.env.CASES_LIMIT_GETTER)) : Number(process.env.CASES_LIMIT_GETTER);
	},
	check_number_parameter: (parameter, default_parameter = constants.no_parameter_found) => {
		return module.exports.check_parameter(parameter, parameter => {
			return isNaN(parameter) ? default_parameter : Number(parameter);
		});
	},
	check_boolean_parameter: parameter => {
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

			return constants.no_parameter_found;
		});
	},
	check_sex_parameter: parameter => {
		return module.exports.check_parameter(parameter, parameter => {
			const parameter_sex = constants.SEX_PARAMETERS.find(sex => sex === parameter);
			return parameter_sex ? parameter_sex : constants.no_parameter_found;
		});
	},
	check_enum_parameter: (parameter, enum_parameters, errors) => {
		return module.exports.check_parameter(parameter, parameter => {
			const parameter_enum = enum_parameters.find(value => value === parameter);
			if(parameter_enum === undefined) {
				errors[parameter] = 'This parameter does not exist.';
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
		return parameter.length === 3 && parameter[1] !== null;
	},
	create_parameter: (filters, key, value, mongoose_filter) => {
		const find = filters.find(filter => filter[0] === key && filter[1] !== null && filter[2] === 'lower_upper');
		return find ? null : filters.push([key, value, mongoose_filter]);
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
