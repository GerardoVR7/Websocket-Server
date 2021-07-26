const Server = require('./models/server');
//import Server from './models/server';
require('dotenv').config();

const server = new Server();


server.exucute();




