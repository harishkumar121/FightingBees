'use strict';
const path = require('path')
// const fs = require('fs')
const formidable = require('formidable');

const { dirname } = require('path');
const aws = require('../helpers/AWSUpload')
const Club = require('../models/clubs')


module.exports = function(_){

    return {

        SetRouting: function(router){
            router.get('/home',this.homePage)
           },

           homePage: function(req,res){

            return res.render('home')
        }

           
}
}