const got = require('got');

module.exports = {
	get_the_follow_link: async doh_source => {
		const response = await got('https://bit.ly/3k4OkcG');
		return response.redirectUrls[0];
	}
};
