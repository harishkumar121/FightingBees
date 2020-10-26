'use strict';

module.exports = function(){

    return {

        SignUpValidation : (req,res,next)=>{
            req.checkBody('username','username is required').notEmpty();
            req.checkBody('username','username should be atleast lessthan 5').isLength({min:5});
            req.checkBody('email','email is required').notEmpty();
            req.checkBody('email','enter valid email').isEmail();
            req.checkBody('password','password is mandatory feild and should be min 3 letters').isLength({min:3})


            req.getValidationResult()
                .then((result)=>{
                    const errors = result.array();
                    const messages =[];
                    errors.forEach(error => {
                        messages.push(error.msg)
                    });

                    req.flash('error',messages)
                    res.redirect('/signup')
                })
                .catch(err=>{
                    return next()
                })
        },

        LoginValidation : (req,res,next)=>{
            req.checkBody('email','email is required').notEmpty();
            req.checkBody('email','enter valid email').isEmail();
            req.checkBody('password','password is mandatory feild and should be min 3 letters').isLength({min:3})


            req.getValidationResult()
                .then((result)=>{
                    const errors = result.array();
                    const messages =[];
                    errors.forEach(error => {
                        messages.push(error.msg)
                    });

                    req.flash('error',messages)
                    res.redirect('/')
                })
                .catch(err=>{
                    return next()
                })
        }
    
    
    
    
    }


}