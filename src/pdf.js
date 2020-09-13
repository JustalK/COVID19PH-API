const got = require('got');

const { google } = require('googleapis');
const credentials = require('../secrets/credentials.json');
const fs = require('fs');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({version: 'v3', auth});

const downloadFile = async function(fileId, file_destination) {
  return new Promise(async (resolve, reject) => {
    const destination = fs.createWriteStream(file_destination);
    const drive_options = {fileId: fileId, alt: 'media'};
    const drive_response = {responseType: 'stream'};
    const drive_stream_file = await drive.files.get(drive_options, drive_response);
    const data = drive_stream_file.data;
    data.on('end', () => {
      resolve();
    }).on('error', error => {
      console.log('Error during download', error);
    })
    .pipe(destination);
  })
}


module.exports = {
  readDOH: async () => {
    //https://content.googleapis.com/drive/v2/files/1E65k-OumPSmsk-Wa33WIwHiWGUOLxRZh?key=AIzaSyDOsAb82j7FYmCsa_sJB3p3CPquqyppikg
    //const response = await got('https://content.googleapis.com/drive/v2/files/1E65k-OumPSmsk-Wa33WIwHiWGUOLxRZh?key=' + process.env.GOOGLE_API_KEY);
    //console.log(response.body);

    var fileId = '1E65k-OumPSmsk-Wa33WIwHiWGUOLxRZh';
    const file = await downloadFile(fileId, 'datas/DOH_source.pdf');
    console.log('HEY');
  }
}
