const controller = require('app/http/controllers/controller');

class adminController extends controller {
    index(req , res){
        res.json('Admin Index Page');
    }

    course(req , res){
        res.json('Course Page');
    }

}

module.exports = new adminController();