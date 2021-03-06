const path = require('path');
const filename = path.basename(__filename, '.js');
const Model = require('../models/' + filename);
const parameters = require('../libs/parameters');
const constants = require('../libs/consts');

const fs = require('fs');
const csv = require('csv-parser');
const logs = require('../libs/logs');

module.exports = dbs => ({
	create_data_from_row: row => {
		return {
			case_code: row.CaseCode,
			age: row.Age,
			sex: row.Sex === 'MALE' ? 'M' : 'F',
			date_start_case: row.DateSpecimen,
			date_result_release: row.DateResultRelease,
			date_result_positive: row.DateRepConf,
			date_recover: row.DateRecover,
			date_died: row.DateDied,
			status: row.HealthStatus,
			quarantined: row.Quarantined === 'YES',
			pregnant: row.Pregnanttab === 'YES',
			region: row.RegionRes,
			city: row.CityMunRes
		};
	},
	create_model: data => {
		return new Model(data);
	},
	create: async data => {
		return dbs.create(data);
	},
	create_many: async data => {
		return dbs.create_many(data);
	},
	create_cluster: async (clusters, a_case, size_cluster) => {
		if (!a_case || !clusters) {
			return null;
		}

		if (!Array.isArray(clusters) || clusters.length === 0) {
			clusters = [];
		}

		const size_last_cluster = clusters.length;
		if (size_last_cluster >= size_cluster) {
			logs.info('Saving new cases :' + size_last_cluster);
			clusters.push(a_case);
			await module.exports(dbs).create_many(clusters);
			clusters = [];
		} else {
			clusters.push(a_case);
		}

		return clusters;
	},
	get_all: async (filters, sort = null, limit = null, skip = null) => {
		const filter_mongoose = filters.map(parameters.create_mongoose_parameters);
		const find = filter_mongoose.length === 0 ? {} : {$and: filter_mongoose};
		return dbs.get_all(find, sort, limit, skip);
	},
	count_total_cases: async () => {
		return dbs.count({});
	},
	get_model_keys: () => {
		return Object.keys(Model.schema.obj);
	},
	get_distinct: async field => {
		const result = await dbs.get_distinct(field);
		return result[0].rsl;
	},
	remove_all_cases: async () => {
		return dbs.remove_many({});
	},
	create_cases: async csv_path => {
		return new Promise((resolve, reject) => {
			let clusters = [];
			let count = 0;
			const stream = fs.createReadStream(csv_path)
				.pipe(csv())
				.on('data', async row => {
					try {
						stream.pause();
						const data = module.exports(dbs).create_data_from_row(row);
						const a_case = module.exports(dbs).create_model(data);
						clusters = await module.exports(dbs).create_cluster(clusters, a_case, constants.CLUSTER_LIMIT);
						count++;
					} finally {
						stream.resume();
					}
				})
				.on('end', async () => {
					await module.exports(dbs).create_many(clusters);
					logs.info('Total new cases saved :' + count);
					resolve({number_cases: count, last_clusters: clusters});
				});
		});
	}
});
