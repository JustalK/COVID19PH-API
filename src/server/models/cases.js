const mongoose = require('mongoose');
const path = require('path');
const filename = path.basename(__filename, '.js');

const schema = new mongoose.Schema({
	case_code: {
		type: String,
		uppercase: true,
		trim: true,
		default: 'NO DATA'
	},
	age: {
		type: Number,
		default: -1
	},
	sex: {
		type: String,
		uppercase: true,
		trim: true,
		default: 'NO DATA'
	},
	date_start_case: {
		type: Date,
		default: null
	},
	date_result_release: {
		type: Date,
		default: null
	},
	date_result_positive: {
		type: Date,
		default: null
	},
	date_recover: {
		type: Date,
		default: null
	},
	date_died: {
		type: Date,
		default: null
	},
	status: {
		type: String,
		trim: true,
		uppercase: true,
		default: 'NO DATA'
	},
	quarantined: {
		type: Boolean
	},
	pregnant: {
		type: Boolean
	},
	region: {
		type: String,
		uppercase: true,
		trim: true,
		default: 'NO DATA'
	},
	city: {
		type: String,
		uppercase: true,
		trim: true,
		default: 'NO DATA'
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: filename,
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

module.exports = mongoose.model(filename, schema);
