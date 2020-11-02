const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const http = require('http');
const { Router } = require('express');
const cookieParser = require('cookie-parser');
// const Validator = require('express-validator');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')
const mongoose = require('mongoose')
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const container = require('./container');
// const _ = require('lodash')

container.resolve(function(users, _, admin, home ){


    mongoose.set('useFindAndModify',false);
    mongoose.set('useCreateIndex',true)
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/chatapp',{useNewUrlParser:true})

    const app = SetupExpress();

    function SetupExpress(){

        const app = express()
        const server = http.createServer(app);
        server.listen(4000,function(){

            console.log('listening on port 4000');
        });
        ConfigureExpress(app)

         // Setup router
    const router = require('express-promise-router')()
    users.SetRouting(router);
    admin.SetRouting(router)
    home.SetRouting(router)

    app.use(router)


    }

   

    function ConfigureExpress(app){
        require('./passport/passport-local');
        require('./passport/passport-facebook');
        require('./passport/passport-google')


        app.use(express.static('public'));
        app.use(cookieParser())
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        // app.use(Validator())
        app.use(session({
            secret: "thisisachatapp",
            resave : true,
            saveInitialized:true,
            store : new MongoStore({mongooseConnection: mongoose.connection})

        }))
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.locals._ = _;

    }


});




