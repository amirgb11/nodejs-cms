const controller = require('app/http/controllers/controller');

class adminController extends controller {
    index(req , res){
        res.render('admin/index');;
    }

    course(req , res){
        res.json('Course Page');
    }

}

module.exports = new adminController();