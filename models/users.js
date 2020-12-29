const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const { use } = require('passport');
const { ObjectId } = mongoose.Schema;


const userSchema = mongoose.Schema({
    username    : { type: String,unique:true},
    fullname    : { type: String },
    email       : { type: String,unique:true},
    password    : { type: String },
    userImage: {type: String, default: 'defaultPic.png'},
    facebook    : { type: String , default:''},
    fbTokens    : { type: Array },
    google      : { type: String },
    googleTokes : { type: String },
    sentRequest: [{
        username: { type: String },

    }],
    request:[{
        userId: { type:ObjectId, ref:'User' },
        username : { type: String }
    }],
    friendsList: [{
        friendId : { type:ObjectId, ref:'User' },
        friendName: { type: String}
    }],
    totalRequest: {type:Number, default: 0},
    gender:     { type: String, default: ""},
    country:    { type: String, default: ""},
    mantra:      { type: String, default:""},
    favNationalTeam: [{
            teamName: { type: String, default:""}
            }],
    favPlayer: [{
        playerName: { type: String}
    }],
    favClub: [{
        clubName: { type: String }
    }]
});


userSchema.methods.encryptPassword = function(password){

    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}

userSchema.methods.validUserPassword = function(password){

    return bcrypt.compareSync(password,this.password)

};



module.exports = mongoose.model('User',userSchema)