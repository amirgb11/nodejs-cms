const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // for passing session to mongodb
//const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');




class Application {
    constructor(){
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();

    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000 , () => console.log('App Run on Port 3000'));
    } 

    setMongoConnection() {
        mongoose.Promise = global.Promise  // setting global NodeJs promise with MongoDb promise
        mongoose.connect('mongodb://localhost/nodejs-cms'); // connect to nodejs-cms db 

    }


    setConfig() { 
        app.use(express.static('public')); // 1. set public path 
        app.set('view engine' , 'ejs'); // 2. set template engine  
        app.set('views' , path.resolve('./resource/views')); // 3. set views directories
        app.use(bodyParser.json()); // 4. config middleware of body-parser 
        app.use(bodyParser.urlencoded({ extended : true})); // 4. config middleware of body-parsers

        app.use(validator())
        app.use(session({
            secret : 'mysecretkey' , 
            resave : true , 
            saveUninitialized : true ,
            store : new MongoStore({ mongooseConnection : mongoose.connection }) // session stores in mongodb 
        }))

        app.use(cookieParser('mysecretkey'));
        app.use(flash()); // messages for example req.flash();

    } // end of setConfig

    setRouters(){
        app.use(require('app/routes/api'));  
        app.use(require('app/routes/web')); // chon dar index.js router/web be soorat router export kardim . 
    }

} // export class for require in server.js

module.exports = Application;