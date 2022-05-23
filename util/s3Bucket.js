import S3 from 'aws-sdk/clients/s3.js'
import dotenv from 'dotenv'
import asynHandler from 'express-async-handler'
import path from 'path'
dotenv.config()

const AWS_BUCKET_NAME = "healthcoach-fitness"





export const s3UpdataSingle = asynHandler(async (req, res, next) => {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_BUCKET_REGION
    })

    const file = req.file;

    const params = {
        Bucket: "healthcoach-fitness",
        Key: file.originalname,
        Body: file.buffer
    };

    try {
        const data = await s3.upload(params).promise();
        req.file = { path: data.Location };
        next();
    } catch (err) {
        res.status(400);
        throw new Error('Upload failed');
    }
});
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION
})

export const s3Multiple = asynHandler(async (req, res, next) => {

    const files = req.files;
    const videoFile = files.video[0]
    const previewFile = files.preview[0]
    const dietimageFile = files.dietimage[0]
    let results = {}
    let count = 0



    const videoFileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${videoFile.fieldname}-${Date.now()}${path.extname(videoFile.originalname)}`,
        Body: videoFile.buffer
    };
    try {
        const data = await s3.upload(videoFileparams).promise();
        results.video = data.Location
        count++;

    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }



    const previewFileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${previewFile.fieldname}-${Date.now()}${path.extname(previewFile.originalname)}`,
        Body: previewFile.buffer
    };
    try {
        const data = await s3.upload(previewFileparams).promise();

        results.preview = data.Location
        count++;

    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }



    const dietimageFileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${dietimageFile.fieldname}-${Date.now()}${path.extname(dietimageFile.originalname)}`,
        Body: dietimageFile.buffer
    };
    try {
        const data = await s3.upload(dietimageFileparams).promise();

        results.dietimage = data.Location
        count++;

    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }


    if (count === 3) {
        req.files = results

        next();
    }




});


export const s3Banner = asynHandler(async (req, res, next) => {

    const files = req.files;
    const image1 = files.image1[0]
    const image2 = files.image2[0]
    const image3 = files.image3[0]
    const media = [image1, image2, image3]
    let results = {}
    let count = 0



    const image1params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${image1.fieldname}-${Date.now()}${path.extname(image1.originalname)}`,
        Body: image1.buffer
    };
    try {
        const data = await s3.upload(image1params).promise();
        results.image1 = data.Location
        count++;


    } catch (err) {
        res.status(400);
        throw new Error('Upload failed');
    }



    const image2Fileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${image2.fieldname}-${Date.now()}${path.extname(image2.originalname)}`,
        Body: image2.buffer
    };
    try {
        const data = await s3.upload(image2Fileparams).promise();

        results.image2 = data.Location
        count++;


    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }



    const image3Fileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${image3.fieldname}-${Date.now()}${path.extname(image3.originalname)}`,
        Body: image3.buffer
    };
    try {
        const data = await s3.upload(image3Fileparams).promise();

        results.image3 = data.Location
        count++;

    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }


    if (count === 3) {
        req.files = results
        next();
    }




});


export const getFilestream = (filekey) => {
    const downloadParms = {
        Key: filekey,
        Bucket: AWS_BUCKET_NAME
    }
    return s3.getObject(downloadParms).createReadStream()
}
