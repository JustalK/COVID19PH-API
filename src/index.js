require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV});
const google = require('./google');
const pdf = require('./pdf');
const utils = require('./utils');

module.exports = {
	get_data: async () => {
		const doh_source = await google.download_DOH_report();
		const doh_folder_link = await pdf.get_DOH_folder_link(doh_source);
		console.log(doh_folder_link);
		const doh_folder_redirect_link = await utils.get_the_follow_link('https://bit.ly/3k4OkcG');
		console.log(doh_folder_redirect_link);
	}
};
