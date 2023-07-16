import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";
dotenv.config();
// get photos from s3
export async function getPhotosFromS3(fileName) {
    let key = fileName;
    if (fileName === "defaultphoto.png") {
        key = `uploads/${fileName}`;
    }
    const getParams = {
        Bucket: "user-alert-uploads",
        Key: key,
    };
    const command = new GetObjectCommand(getParams);
    let s3;
    if (process.env.NODE_ENV === "production") {
        s3 = new S3Client({ region: "us-west-1" });
    }
    else {
        s3 = new S3Client({
            region: "us-west-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    // Use presigner to generate a presigned url
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // Url expires in 1 hour
    return url;
}
//# sourceMappingURL=photoGetHelper.js.map