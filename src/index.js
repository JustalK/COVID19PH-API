require('dotenv').config({path: './env/.env.' + process.env.NODE_ENV})
const google = require('./google')
const pdf = require('./pdf')

module.exports = {
  get_data: async () => {
    const doh_source = await google.download_DOH_report();
    const doh_folder_link = await pdf.get_DOH_folder_link(doh_source);
    console.log(doh_folder_link);
  }
};
