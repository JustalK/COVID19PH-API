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
			return param == 'TRUE' || param == 1;
		})
	},
	check_sex_parameter: param => {
		return module.exports.check_parameter(param, param => {
			const param_sex = ['M', 'F'].find(sex => sex == param)
			return param_sex ? param_sex : constants.no_parameter_found;
		})
	},
	check_parameter: (param, fn) => {
		const param_exist = param ? param : null;
		if (!param_exist) {
			return constants.no_parameter_found;
		}
		return fn(param);
	},
	is_valid_parameter: param => {
		return param[1] && param.length == 3;
	},
	create_mongoose_parameters: filter => {
		switch (filter[2]) {
				case 'lower_upper':
					return  {[filter[0]]: {$gte: filter[1][0], $lte: filter[1][0]}};
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
