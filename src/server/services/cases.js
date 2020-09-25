const path = require('path');
const filename = path.basename(__filename,'.js');
const models_cases = require('../models/cases');
const parameters = require('../libs/parameters');

const fs = require('fs');
const csv = require('csv-parser')
const cluster_limit = 10000;

module.exports = dbs => ({
	create_model: data => {
		return new models_cases(data);
	},
	create: async data => {
		return dbs.create(data);
	},
	create_many: async data => {
		return dbs.create_many(data);
	},
	get_all: async (filters, sort = null, limit = null) => {
		const filter_mongoose = filters.map(parameters.create_mongoose_parameters);
		const find = {$and: filter_mongoose};
		return dbs.getAll(find, sort, limit);
	},
	create_cases: async () => {
		return new Promise(async (resolve, reject) => {
			let cases = [];
			let cluster = [];
			let count = 0;
			fs.createReadStream('datas/COVID_PH_CASE.csv')
			.pipe(csv())
			.on('data', row => {
				const data = module.exports(dbs).create_model({
					case_code: row.CaseCode,
					age: row.Age,
					sex: row.Sex === 'MALE' ? 'M' : 'F',
					date_start_case: row.DateSpecimen,
					date_result_release: row.DateResultRelease,
					date_result_positive: row.DateRepConf,
					date_recover: row.DateRecover,
					date_died: row.DateDied,
					health_status: row.HealthStatus,
					quarantined: row.Quarantined === 'YES' ? true : false,
					pregnant: row.Pregnanttab === 'YES' ? true : false,
					region: row.RegionRes,
					city: row.CityMunRes
				})
				cluster.push(data);
				if(cluster.length>=cluster_limit) {
					console.log(count);
					cases.push(cluster);
					cluster = [];
				}
				//await services_cases.create(data);
				count++;
			})
			.on('end', function () {
				cases.push(cluster);
				cases.map(async x => {
					console.log(x);
					await module.exports(dbs).create_many(x);
				})

				console.log(count);
				console.log('Data loaded')
				resolve();
			})
		})
	}
})
