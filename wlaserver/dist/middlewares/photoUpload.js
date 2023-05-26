import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
const s3 = new S3Client({ region: 'us-west-1' });
const storage = multerS3({
    s3: s3,
    bucket: 'user-alert-uploads',
    key: function (req, file, cb) {
        const randomNumber = crypto.randomBytes(16).toString('hex');
        const key = 'uploads/' + randomNumber + '.PNG';
        file.key = key;
        cb(null, key);
    },
});
const uploader = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});
const uploadMultiple = uploader.array('images', 3);
export default uploadMultiple;
//# sourceMappingURL=photoUpload.js.map