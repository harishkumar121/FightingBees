require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const http = require('http');
const path = require('path')
const { Router } = require('express');
const cookieParser = require('cookie-parser');
// const Validator = require('express-validator');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')
const mongoose = require('mongoose')
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const socketIO = require('socket.io');
const { Users } = require('./helpers/UsersClass')
const { Global } = require('./helpers/Global')
const container = require('./container');

const compression = require('compression')
const helmet = require('helmet')
// const interests = require('./controllers/interests');
// const _ = require('lodash')
const uri =  process.env.MONGODB_URI 
container.resolve(function(users, _, admin, home, group, results, privatechat, profile, interests, news){

    mongoose.set('useFindAndModify',false);
    mongoose.set('useCreateIndex',true)
    mongoose.Promise = global.Promise;
    mongoose.connect(uri,{useNewUrlParser:true})

    const app = SetupExpress();

    function SetupExpress(){

        const app = express()
        const server = http.createServer(app);
        const io  = socketIO(server);
        server.listen(process.env.PORT || 4000,function(){

            console.log('listening on port 4000');
        });
        ConfigureExpress(app,io)
        
        require('./socket/groupchat')(io, Users)
        require('./socket/friend')(io)
        require('./socket/globalroom')(io, Global, _)
        require('./socket/privatemessage')(io)



        // extra checkcomment
         // Setup router
    const router = require('express-promise-router')()
    users.SetRouting(router);
    admin.SetRouting(router);
    home.SetRouting(router);
    group.SetRouting(router);
    results.SetRouting(router);
    privatechat.SetRouting(router)
    profile.SetRouting(router);
    interests.SetRouting(router)
    news.SetRouting(router)

    app.use(router)

    app.use(function(req,res){
        res.render('404')
    });

    }

   

    function ConfigureExpress(app,io){


        require('./passport/passport-local');
        require('./passport/passport-facebook');
        require('./passport/passport-google')

        app.use(compression());
        app.use(helmet());


        app.use(express.static('public'));
        app.use(cookieParser())
        app.set('view engine','ejs');
        app.set('views', path.join(__dirname, 'views'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        // app.use(Validator())
        app.use(session({
            secret: process.env.SECRET_KEY,
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




