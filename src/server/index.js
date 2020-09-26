require('dotenv').config({ path: './env/.env.production'});
const server = require('./server');
const database = require('./database');

database.mongoose_connect();
server.start();
