const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');


const s3 = new aws.S3();

const uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'user-alert-uploads',
        key: function (req, file, cb) {
            const randomNumber = crypto.randomBytes(16).toString('hex');
			const key = 'uploads/' + randomNumber + '.PNG';
			file.key = key;
			cb(null, key);
		},