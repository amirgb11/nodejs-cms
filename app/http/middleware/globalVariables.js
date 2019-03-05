const middleware = require('./middleware');

class globalVariables extends middleware {
    
    handle(req , res ,next) {
        res.locals = {
            messages : req.flash('errors')
        }
        next();
    }


}


module.exports = new globalVariables();