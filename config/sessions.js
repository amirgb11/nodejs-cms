const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // for passing session to mongodb
const mongoose = require('mongoose');


module.exports = {
    secret : process.env.SESSION_SECRETKEY , 
    resave : true , 
    saveUninitialized : true ,
    cookie : { expires : new Date(Date.now() + 1000 * 60 * 60)} ,// 1 hour
    store : new MongoStore({ mongooseConnection : mongoose.connection }) // session stores in mongodb 
}