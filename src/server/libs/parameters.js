const constants = require('../libs/consts');

module.exports = {
	check_limit_parameter: param => {
		return param ? module.exports.check_number_parameter(param, Number(process.env.CASES_LIMIT_GETTER)) : Number(process.env.CASES_LIMIT_GETTER)
	},
	check_number_parameter: (param, default_param = constants.no_parameter_found) => {
		return module.exports.check_parameter(param, param => {
			return isNaN(param) ? default_param : Number(param);
		})
	},
	check_boolean_parameter: param => {
		return module.exports.check_parameter(param, param => {
			param = param.toString();
			const param_boolean_true = ['TRUE', '1'].find(boolean =>  boolean == param.toUpperCase())
			if (param_boolean_true) {
				return true;
			}

			const param_boolean_false = ['FALSE', '0'].find(boolean => boolean == param.toUpperCase())
			if (param_boolean_false) {
				return false;
			}

			return constants.no_parameter_found;
		})
	},
	check_sex_parameter: param => {
		return module.exports.check_parameter(param, param => {
			const param_sex = ['M', 'F'].find(sex => sex == param)
			return param_sex ? param_sex : constants.no_parameter_found;
		})
	},
	check_parameter: (param, fn) => {
		const param_exist = param != null ? param : null;
		if (param_exist === null) {
			return constants.no_parameter_found;
		}
		return fn(param);
	},
	is_valid_parameter: param => {
		return param.length == 3 && param[1] !== null;
	},
	create_mongoose_parameters: filter => {
		switch (filter[2]) {
				case 'lower_upper':
					return  {[filter[0]]: {$gte: filter[1][0], $lte: filter[1][1]}};
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
}
