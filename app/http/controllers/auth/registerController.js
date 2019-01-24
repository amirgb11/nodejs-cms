const controller = require('app/http/controllers/controller');
const passport = require('passport');

class registerController extends controller {
    
    showRegisterationForm(req , res) {
        
        res.render('auth/register' , { messages : req.flash('errors') , recaptcha : this.recaptcha.render() });
    }

    registerProccess(req ,res , next) {
        //console.log(req.body);         // check for sended req information to server 
        this.recaptchaValidation(req , res)
            .then(result => this.validationData(req))
            .then(result => {
                if(result)  this.register(req , res ,next);
                else  res.redirect('/register');
            });

        // this.recaptcha.verify(req , (err , data ) => {
        //     if(err) {
        //         console.log(err);
        //          res.json('error');
        //     } else {        
        //         this.validationData(req)
        //         .then(result => {
        //             if(result) res.json('register proccess')
        //             else res.redirect('/register');
        //         });
        //     }
        // })
        
    }


    register(req , res , next){
        passport.authenticate('local.register' , {
            successRedirect : '/' , 
            failureRedirect : '/register' , 
            failureFlash : true
        })(req , res , next);
    }

}

module.exports = new registerController();