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

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.created_at;
    delete obj.updated_at;
    delete obj.__v;
    delete obj._id;
    delete obj.id;
	// Clean the object from useless data
	Object.keys(obj).map(key => {
		if(obj[key] === null) {
	    	delete obj[key];
		}
	})
    return obj;
}

module.exports = mongoose.model(filename, schema);
