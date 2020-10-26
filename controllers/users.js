'use strict';

module.exports = function(_,passport,User,validator){

    return {

        SetRouting: function(router){
            router.get('/',this.indexPage)
            router.get('/signup',this.getSignUp)
            router.get('/home',this.homePage)


            router.post('/signup',[
            
                validator.check('username').isLength({min:5}).withMessage('username should be atleast lessthan 5'),
                validator.check('email').isEmail().withMessage('enter valid email'),
                validator.check('password').isLength({min:3}).withMessage('password is mandatory feild and should be min 3 letters')
    
    
            ],
                this.postValidation,this.postSignUP)
            router.post('/',[
            
               
                validator.check('email').isEmail().withMessage('enter valid email'),
                validator.check('password').isLength({min:3}).withMessage('password is mandatory feild and should be min 3 letters')
    
    
            ],this.postValidation,this.postLogin)

        },
        indexPage: function(req,res){
            const errors = req.flash('error')

            return res.render('index',{title:'Footballkik | Login',messages:errors,
            hasErrors:errors.length>0  });
        },

        postLogin: passport.authenticate('local.login',{
            successRedirect:'/home',
            failureRedirect: '/',
            failureFlash : true
        }),


        getSignUp: function(req,res){
            const errors = req.flash('error')
            return res.render('signup',{title:'Footballkik | Login',messages:errors,
            hasErrors:errors.length>0  })
        },

        postSignUP: passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect: '/signup',
            failureFlash : true
        }),

        postValidation : function(req,res,next){

            const result = validator.validationResult(req);
            if (!result.isEmpty()) {
                const errors = result.array();
                const messages =[];
                errors.forEach(error => {
                    messages.push(error.msg)
                });

                req.flash('error',messages)
                // if(req.url === '/siggnup'){
                //     res.redirect('/signup')
                // }
                // else{
                //     res.redirect('/')
                // }
            }
            return next();
        },

        homePage: function(req,res){

            return res.render('home')
        }
    }


}