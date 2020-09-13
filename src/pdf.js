const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = {
  get_DOH_folder_link: async doh_source => {
    const doh_source_buffer = fs.readFileSync(doh_source);
    const doh_source_data = await pdf(doh_source_buffer);
    const doh_source_text = doh_source_data.text;
    const matches = doh_source_text.match(/.*bit.*/gi);
    return matches[0];
  }
}
