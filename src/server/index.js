require('dotenv').config({path: './env/.env.production'});
const server = require('./server');
const database = require('./database');

database.mongoose_connect(process.env.DB_NAME, process.env.DB_URI_DATA, process.env.DB_USER_DATA, process.env.DB_PASS_DATA);
server.start(process.env.API_NAME, process.env.HOST, process.env.PORT);
