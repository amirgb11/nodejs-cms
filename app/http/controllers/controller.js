const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;


class controller {
    constructor(){
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig(){
        this.recaptcha = new Recaptcha('6Ld32oQUAAAAAI_1Bg0dXvcC86Oa7Lgna2Zqx1EV', '6Ld32oQUAAAAACwSRL6LYM_9Su9NM7oJIGLlOWFn' , {
            hl : 'fa'
        })
    }

    recaptchaValidation( req , res){
        return new Promise((resolve , reject) => {
            this.recaptcha.verify(req , ( err , data) => {
                if (err) {
                     req.flash('errors' , 'لطفا ریکپچا را پر کنید . ' );
                     res.redirect(req.url);
                } else resolve(true);
            })
        })
    }
}

module.exports = controller ;