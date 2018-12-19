const controller = require('app/http/controllers/controller');

class registerController extends controller {
    showRegistrationForm(req , res){

        res.render('auth/register');
    }

    registerProccess(req , res , next){
        //console.log(req.body);
       this.validationData(req , res , next )
            .then(result => {
                 res.json(result);
            })        
    }

    validationData(req ,res ,next){
        
                // validation with express validator methods like : notEmpty , isLenght , ... 

        req.checkBody('name' , ' پر کردن فیلد نام ضروری است ').notEmpty()
        req.checkBody('name' , ' فیلد نام نمی تواند کمتر از 5 باشد ').isLength({ min : 5})
        req.checkBody('email' , ' پر کردن فیلد ایمیل ضروری است  ').notEmpty()
        req.checkBody('email' , ' فیلد ایمیل معتبر نیست ').isEmail()
        req.checkBody('password' , ' پر کردن فیلد پسورد ضروری است  ').notEmpty()
        req.checkBody('password' , 'پسورد شما باید حداقل 8 کاراکتر باشد ').isLength({ min : 8})

        return req.getValidationResult()
            .then(result => {
                const errors = result.array();
                 //res.json(errors);
                const messages = [];
                errors.forEach(err => messages.push(err.msg));

                if (messages.length == 0 ) {
                    return true;
                }
                return false;
            })
            .catch(err => console.log(err))


    }

}

module.exports = new registerController();