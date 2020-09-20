const path = require('path');
const filename = path.basename(__filename,'.js');
const services_cases = require('../services/cases');
const models_cases = require('../models/cases');

const fs = require('fs');
const csv = require('csv-parser')

module.exports = {
	create_cases: async () => {
		return new Promise(async (resolve, reject) => {
			let count = 0;
			fs.createReadStream('datas/COVID_PH_CASE.csv')
			.pipe(csv())
			.on('data', async row => {
				const data = new models_cases({
					case_code: row.CaseCode,
					age: row.Age,
					sex: row.Sex,
					date_start_case: row.DateSpecimen,
					date_result_release: row.DateResultRelease,
					date_result_positive: row.DateRepConf,
					date_recover: row.DateRecover,
					date_died: row.DateDied,
					health_status: row.HealthStatus,
					quarantined: row.Quarantined,
					pregnant: row.Pregnanttab,
					region: row.RegionRes,
					city: row.CityMunRes
				})
				//console.log(data);
				console.log(await services_cases.create(data));
				count++;
			})
			.on('end', function () {
				console.log(count);
				console.log('Data loaded')
				resolve();
			})
		})
	}
}
