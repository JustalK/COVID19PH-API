module.exports = {
	create_mongoose_parameters: (filter) => {
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
