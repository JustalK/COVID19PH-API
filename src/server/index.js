require('dotenv').config({ path: './env/.env.production'});
const server = require('./server');
const database = require('./database');

database.mongoose_connect();
server.start(process.env.API_NAME, process.env.HOST, process.env.PORT);
