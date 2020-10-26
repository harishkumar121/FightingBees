const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { use } = require('passport');

const userSchema = mongoose.Schema({
    username    : { type: String,unique:true},
    fullname    : { type: String },
    email       : { type: String,unique:true},
    password    : { type: String },
    userImage   : { type: String },
    facebook    : { type: String , default:''},
    fbTokens    : { type: Array },
    google      : { type: String },
    googleTokes : { type: String }
});


userSchema.methods.encryptPassword = function(password){

    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}

userSchema.methods.validUserPassword = function(password){

    return bcrypt.compareSync(password,this.password)

};



module.exports = mongoose.model('User',userSchema)