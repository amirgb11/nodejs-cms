const controller = require('app/http/controllers/controller');
const passport = require('passport');


class loginController extends controller {
    showLoginForm(req , res){

        res.render('home/auth/login' , { messages : req.flash('errors'), recaptcha : this.recaptcha.render() , title : 'صفحه ی ورود' } );
    }


    loginProccess(req , res , next) {

        this.recaptchaValidation(req , res)
            .then(result => this.validationData(req))
            .then(result => {
                if(result) this.login(req , res , next);
                else  res.redirect('/auth/login');
            })
            .catch(err => console.log(err));

    }

    login(req , res , next ){
        passport.authenticate('local.login' , (err , user) => {
            if(!user) return res.redirect('/auth/login');

            req.logIn(user , err => {          // logIn is a passport function 
                if(req.body.remember) {
                    
                    user.setRememberToken(res);
                }

                return  res.redirect('/');
            })
        }
        //  {
        //     successRedirect : '/' , 
        //     failureRedirect : '/login' , 
        //     failureFlash : true 
        // }


        )(req , res , next);
    }

}

module.exports = new loginController();