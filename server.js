require('app-module-path').addPath(__dirname);

const App = require('./app');    // require index.js 

new App();
// const express = require('express');
// const app = express();
// app.use(require('./app'));