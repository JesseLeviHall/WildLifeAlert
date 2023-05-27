import express, { Request, Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();
interface File extends Express.Multer.File {
  key?: string;
}

let s3;

if (process.env.NODE_ENV === 'production') {
  s3 = new S3Client({ region: 'us-west-1' });
} else {
  s3 = new S3Client({
    region: 'us-west-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
    },
  });
}

const storage = multerS3({
  // @ts-ignore 
  s3: s3,
  bucket: 'user-alert-uploads',
  key: function (req: Request, file: File, cb: (error: Error | null, filename: string | null) => void) {
    const randomNumber = crypto.randomBytes(16).toString('hex');
    const key = 'uploads/' + randomNumber + '.PNG';
    file.key = key;
    cb(null, key);
  },
});

const uploader = multer({ 
  storage,
  fileFilter: function (req: Request, file: File, cb: (error: Error | null, result: boolean) => void) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

const uploadMultiple = uploader.array('images', 3);

export default uploadMultiple;