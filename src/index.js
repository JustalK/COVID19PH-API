require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV});
const google = require('./google');
const pdf = require('./pdf');
const utils = require('./utils');
const csv = require('./csv');

module.exports = {
	get_data: async () => {
		/**
		const doh_source = await google.download_file('1E65k-OumPSmsk-Wa33WIwHiWGUOLxRZh', 'datas/DOH_source.pdf');
		const doh_folder_link = await pdf.get_DOH_folder_link(doh_source);
		console.log(doh_folder_link);
		const doh_folder_redirect_link = await utils.get_the_follow_link('https://bit.ly/3k4OkcG');
		console.log(doh_folder_redirect_link);
		const doh_folder_ID = google.get_folder_ID(doh_folder_redirect_link);
		console.log(doh_folder_ID);
		const files_in_directory = await google.read_files_in_directory(doh_folder_ID);
		console.log(files_in_directory);
		const covid_case_file = utils.get_covid_case_file(files_in_directory);
		console.log(covid_case_file);
		**/
		//const doh_source = await google.download_file('11zq6uSUTdgp6oOWsWPX96O-rUp-p76FP', 'datas/COVID_PH_CASE.csv');
		await csv.read_csv('lol');
	}
};
