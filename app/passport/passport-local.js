const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('app/models/user');


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });


passport.use('local.register' , new localStrategy({
    usernameField : 'email', 
    passwordField : 'password',
    passReqToCallback : true
} , (req , email , password , done) => {
    console.log(email , password);
    User.findOne({
        'email' : email
    } , ( err , user) => {
        if(err) return done(err);
        if(user) return done( null , false , req.flash('errors' , 'این کاربر قبلا ثبت نام شده است . '));

        const newUser = new User({
            name : req.body.name , 
            email : req.body.email ,
            password : req.body.password 
        });

        newUser.save(err => {
            if(err) return done( err , false , req.flash('errors' , 'ثبت نام ناموفق '));
            done(null , newUser);
        })
    })
}))


passport.use('local.login' , new localStrategy({
    usernameField : 'email', 
    passwordField : 'password',
    passReqToCallback : true
} , (req , email , password , done) => {
    console.log(email , password);
    User.findOne({
        'email' : email
    } , ( err , user) => {
        if(err) return done(err);
        if(!user){
            return done( null , false , req.flash('اطلاعات شما مطابقت ندارد .'));
        }

        done(null , user);
    })
}))