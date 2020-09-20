const mongoose = require('mongoose');
const path = require('path');
const filename = path.basename(__filename,'.js');

/**
{
  CaseCode: 'C985653',
  Age: '41.0',
  AgeGroup: '40 to 44',
  Sex: 'MALE',
  DateSpecimen: '2020-05-27',
  DateResultRelease: '',
  DateRepConf: '2020-06-01',
  DateDied: '',
  DateRecover: '2020-06-11',
  RemovalType: 'RECOVERED',
  Admitted: 'YES',
  RegionRes: 'ROF',
  ProvRes: '',
  CityMunRes: '',
  CityMuniPSGC: '',
  HealthStatus: 'RECOVERED',
  Quarantined: 'NO',
  DateOnset: '',
  Pregnanttab: '',
  ValidationStatus: 'Case has Lab Result, but Result Date is blank\n' +
    'Case has Admitting Facility but is not Admitted (or vice versa)'
}
{
  CaseCode: 'C646530',
  Age: '16.0',
  Sex: 'FEMALE',
  DateSpecimen: '2020-08-17',
  DateResultRelease: '2020-08-19',
  DateRepConf: '2020-08-22',
  DateDied: '',
  DateRecover: '',
  RemovalType: 'RECOVERED',
  Admitted: 'NO',
  RegionRes: 'NCR',
  ProvRes: 'NCR',
  CityMunRes: 'CITY OF MALABON',
  CityMuniPSGC: 'PH137502000',
  HealthStatus: 'RECOVERED',
  Quarantined: 'NO',
  DateOnset: '',
  Pregnanttab: 'NO',
  ValidationStatus: 'Removal Type is "Recovered", but no Recovered Date is recorded\n' +
    'Health Status is "Recovered", but no Date Recovered is recorded'
}
**/

const schema = new mongoose.Schema({
	case_code : {
		type : String,
		uppercase: true,
		trim: true,
		required : true
	},
	age : {
		type : Number,
		default: 0,
		required : true
	},
	sex : {
		type : String,
		uppercase: true,
		trim: true,
		default: 'NO DATA',
		required : true
	},
	date_start_case : {
		type : Date,
		default: null
	},
	date_result_release : {
		type : Date,
		default: null
	},
	date_result_positive : {
		type : Date,
		default: null
	},
	date_recover : {
		type : Date,
		default: null
	},
	date_died : {
		type : Date,
		default: null
	},
	health_status : {
		type : String,
		trim: true,
		uppercase: true,
		default: 'NO DATA',
		required : true
	},
	quarantined : {
		type : String
	},
	pregnant : {
		type : String
	},
	region : {
		type : String,
		uppercase: true,
		trim: true,
		default: 'NO DATA',
		required : true
	},
	city : {
		type : String,
		uppercase: true,
		trim: true,
		default: 'NO DATA',
		required : true
	}
}, {
	timestamps : {
		createdAt : 'created_at',
		updatedAt : 'updated_at'
	},
	collection : filename,
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

module.exports = mongoose.model(filename,schema);
