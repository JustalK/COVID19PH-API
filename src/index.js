require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV})
const pdf = require('./pdf')

module.exports = {
  get_data: async () => {
    return await pdf.readDOH();
  }
};
