'user strict';

const passport = require('passport');
const User = require('../models/users');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secret/secreteFile')

passport.serializeUser((user,done)=>{

    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
            done(err,user)
    })

});


passport.use(new FacebookStrategy({
    clientID: secret.facebook.clientID,
    clientSecret: secret.facebook.clientSecret,
    profileFields:['email','displayName','photos'],
    callbackUrl:'http://localhost:4000/auth/facebook/callback',
    passReqToCallback:true

},(req,token, refreshToken, profile, done)=>{

    User.findOne({'facebook':profile.id},(err,user)=>{

        if(err){
            return done(err)
        }

        if(user){
            return done(null,user)
        }else{
            const newUser = new User();
            newUser.facebook = profile.id
            newUser.fullname = profile.displayName;
            newUser.username = profile.displayName;
            
            newUser.email = profile._json.email;
            newUser.userImage = 'https://graph.facebook.com/'+profile.id+'/picture?type=large';
            newUser.fbTokes.push({token:token})
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










