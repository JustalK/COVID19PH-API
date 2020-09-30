const got = require('got');
const DATAS_SOURCE = 'datas/DOH_source.pdf';
const {google} = require('googleapis');
const credentials = require('../../../secrets/credentials.json');
const fs = require('fs');
const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, scopes);
const drive = google.drive({version: 'v3', auth});

module.exports = {
	get_folder_ID: url => {
		const matches = url.match(/(?<=folders\/).*(?=\?)/gi);
		return matches[0];
	},
	download_file: async (fileId, file_destination) => {
		return new Promise(async (resolve, reject) => {
			const destination = fs.createWriteStream(file_destination);
			const drive_options = {fileId, alt: 'media'};
			const drive_response = {responseType: 'stream'};
			const drive_stream_file = await drive.files.get(drive_options, drive_response);
			const {data} = drive_stream_file;
			data.on('end', () => {
				resolve(file_destination);
			}).on('error', error => {
				console.log('Error during download', error);
				reject(error);
			}).pipe(destination);
		});
	},
	read_files_in_directory: async folderId => {
		const files_in_directory = await drive.files.list({q: `'${folderId}' in parents`});
		return files_in_directory.data.files;
	}
};
