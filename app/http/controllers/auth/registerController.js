const controller = require('app/http/controllers/controller');
const passport = require('passport');

class registerController extends controller {
    
    showRegisterationForm(req , res) {
        //let formData = req.flash('formData');
        
        res.render('home/auth/register' , { 
            // messages : req.flash('errors') ,     commented because set this in globalVariables 
            recaptcha : this.recaptcha.render() , 
            title : "صفحه ی عضویت" ,
             });
    }

    async registerProccess(req ,res , next) {
        //console.log(req.body);         // check for sended req information to server 
        await this.recaptchaValidation(req , res)
        let result = await this.validationData(req)
            if (result => {
                return this.register(req , res ,next);
            });

        req.flash('formData' , req.body);
        return res.redirect('/auth/register');
    }


    register(req , res , next){
        passport.authenticate('local.register' , {
            successRedirect : '/' , 
            failureRedirect : '/auth/register' , 
            failureFlash : true
        })(req , res , next);
    }

}

module.exports = new registerController();