const AWS = require('aws-sdk')

const multer = require('multer')
const multerS3 = require('multer-s3')
const secret = require('../secret/secreteFile')

AWS.config.update({
    accessKeyId:process.env.AWS_ACCESSKEY, //secret.aws.clientID,
    secretAccessKey: process.env.AWS_SECRETKEY, //secret.aws.clientSecret,
    region:process.env.AWS_REGION 
})

const s0 = new AWS.S3({});
const upload = multer({
    storage:multerS3({
        s3 : s0,
        bucket:'fbchat',
        acl: 'public-read',
        metadata(req,file,cb){
            console.log(file.fieldname)
            cb(null,{fieldName:'upload'})
        },
        key(req,file,cb){
            console.log(file.originalname)
            cb(null,String(file.originalname));
        },
        // rename(fieldName,fileName){
        //     return fileName.replace(/\w+/g,'-');
        // }

    })
})

exports.Upload = upload;

