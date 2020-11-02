const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { use } = require('passport');

const clubNames = mongoose.Schema({

    name        : { type: String,unique:true},
    country     : { type: String },
    image       : { type: String , default:'default.png'},
    fans       : [{
            username  : { type:String},
            email     : { type:String}
    }]
});


module.exports = mongoose.model('Club',clubNames)