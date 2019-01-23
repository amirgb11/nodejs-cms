require('app-module-path').addPath(__dirname);

const App = require('./app');    // require index.js 
require('dotenv').config();
global.config = require('./config');


new App();
// const express = require('express');
// const app = express();
// app.use(require('./app'));