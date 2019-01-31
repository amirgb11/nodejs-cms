const express = require('express');
const app = express();
const http = require('http');
//const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session); // for passing session to mongodb
//const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helepers = require('./helpers');
const rememberLogin = require('app/http/middleware/rememberLogin');




class Application {
    constructor(){
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();

    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000 , () => console.log('App Run on http://localhost:3000'));
    } 

    setMongoConnection() {
        mongoose.Promise = global.Promise  // setting global NodeJs promise with MongoDb promise
        mongoose.connect(config.database.url); // connect to nodejs-cms db 

    }


    setConfig() {
        
        require('app/passport/passport-local');
        require('app/passport/passport-google');

        app.use(express.static(config.layout.public_dir)); // 1. set public path 
        app.set('view engine' , config.layout.view_engine); // 2. set template engine  
        app.set('views' , config.layout.view_dir); // 3. set views directories

    // express-ejs-layout config - master page
        app.use(config.layout.ejs.expressLayouts);
        app.set("layout extractScripts" , config.layout.ejs.extractScripts);
        app.set("layout extractStyles" , config.layout.ejs.extractStyles);
        app.set("layout" , config.layout.ejs.master_dir);




        app.use(bodyParser.json()); // 4. config middleware of body-parser 
        app.use(bodyParser.urlencoded({ extended : true})); // 4. config middleware of body-parsers

        app.use(validator())
        app.use(session({...config.sessions}))

        app.use(cookieParser(config.cookie_secretkey));
        app.use(flash()); // messages for example req.flash();

        app.use(passport.initialize());  // passport config
        app.use(passport.session());

        app.use(rememberLogin.handle)
        app.use((req , res , next) => {
            // app.locals = {
            //     auth : {
            //         user : req.user , 
            //         check : req.isAuthenticated()
            //     }
                
            // }
            app.locals = new Helepers(req , res).getObjects();
            
            next();
        });                          // middllware for




    } // end of setConfig

    setRouters(){
        app.use(require('app/routes/api'));  
        app.use(require('app/routes/web')); // chon dar index.js router/web be soorat router export kardim . 
    }

} // export class for require in server.js

module.exports = Application;