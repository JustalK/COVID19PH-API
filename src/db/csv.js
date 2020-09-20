const fs = require('fs');
const csv = require('csv-parser')

module.exports = {
	read_csv: async luv => {
		return new Promise(async (resolve, reject) => {
			let count = 0;
			fs.createReadStream('datas/COVID_PH_CASE.csv')
			.pipe(csv())
			.on('data', function (row) {
				console.log(row)
				count++;
			})
			.on('end', function () {
				console.log(count);
				console.log('Data loaded')
				resolve();
			})
		})
	}
};
