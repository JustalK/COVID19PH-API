const path = require('path');
const filename = path.basename(__filename, '.js');
const Model = require('../models/' + filename);
const parameters = require('../libs/parameters');
const constants = require('../libs/consts');

const fs = require('fs');
const csv = require('csv-parser');

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
	create_cluster: (clusters, a_case, size_cluster) => {
		if (!a_case || !clusters) {
			return null;
		}

		if (!Array.isArray(clusters) || clusters.length === 0) {
			clusters = [[]];
		}

		const last_cluster_index = clusters.length - 1;
		const size_last_cluster = clusters[last_cluster_index].length;
		if (size_last_cluster >= size_cluster) {
			const new_cluster = [a_case];
			clusters.push(new_cluster);
		} else {
			clusters[last_cluster_index].push(a_case);
		}

		return clusters;
	},
	cluster_create_many: async clusters => {
		return Promise.all(clusters.map(module.exports(dbs).create_many));
	},
	get_all: async (filters, sort = null, limit = null) => {
		const filter_mongoose = filters.map(parameters.create_mongoose_parameters);
		const find = {$and: filter_mongoose};
		return dbs.get_all(find, sort, limit);
	},
	get_distinct: async (field) => {
		const result = await dbs.get_distinct(field);
		return result[0].rsl;
	},
	create_cases: async csv_path => {
		return new Promise((resolve, reject) => {
			let clusters = [];
			let count = 0;
			fs.createReadStream(csv_path)
				.pipe(csv())
				.on('data', row => {
					const data = module.exports(dbs).create_data_from_row(row);
					const a_case = module.exports(dbs).create_model(data);
					clusters = module.exports(dbs).create_cluster(clusters, a_case, constants.CLUSTER_LIMIT);
					count++;
				})
				.on('end', async () => {
					await module.exports(dbs).cluster_create_many(clusters);
					resolve({number_clusters: clusters.length, number_cases: count, first_clusters: clusters[0]});
				});
		});
	}
});
