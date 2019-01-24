const database = require('./database')
const port = require('./port')
const layout = require('./layout')
const sessions = require('./sessions')
const service = require('./service')




module.exports = {
    database , 
    port , 
    layout , 
    sessions ,
    service , 
    cookie_secretkey : process.env.COOKIE_SECRETKEY
}