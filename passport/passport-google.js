'user strict';

const passport = require('passport');
const User = require('../models/users');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const secret = require('../secret/secreteFile')

passport.serializeUser((user,done)=>{

    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
            done(err,user)
    })

});


passport.use(new googleStrategy({
    clientID:  process.env.GOOGLE_ACCESSKEY,
    clientSecret: process.env.GOOGLE_SECRTEKEY,
    callbackUrl:'http://localhost:4000/auth/google/callback',
    passReqToCallback:true

},(req,acessToken, refreshToken, profile, done)=>{

    User.findOne({'google':profile.id},(err,user)=>{

        if(err){
            return done(err)
        }

        if(user){
            return done(null,user)
        }else{
            const newUser = new User();
            newUser.google = profile.id
            newUser.fullname = profile.displayName;
            newUser.username = profile.displayName;

            newUser.email = profile.emails[0].value;
            newUser.userImage = profile._json.image.url;
            // newUser.fbTokens.push({token:token})
            newUser.save((err)=>{
                if(err){
                    console.log(err)
                }
                return done(null,user)
            })
        }

      

    })


}));





// passport.use('local.login',new LocalStrategy({
//     usernameField:'email',
//     passwordField:'password',
//     passReqToCallback:true
// },(req,email,password,done)=>{

//     User.findOne({'email':email},(err,user)=>{

//         if(err){
//             return done(err)
//         }

//         const messages =[];
//         if(!user || !user.validUserPassword(password)){
//             messages.push('Email or password is incorrect')
//             return done(null,false,req.flash('error',messages))
//         }

//         return done(null,user);

//     })



// }));










