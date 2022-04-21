import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'
import asynHandler from 'express-async-handler'

import path from 'path';
import { count } from 'console';
const AWS_BUCKET_NAME = "healthcoach-fitness"
const AWS_BUCKET_REGION = "us-east-1"
const AWS_ACCESS_KEY = "AKIASYHSVN43WKNXNLOJ"
const AWS_SECRET_KEY = "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"






// export const s3UpdataSingle = asynHandler(async (req, res, next) => {
//     console.log("reached s3");
//     const s3=new S3({
//         accessKeyId: AWS_ACCESS_KEY,
//         secretAccessKey:AWS_SECRET_KEY,
//         region: AWS_BUCKET_REGION
//     })

//     const file = req.file;
//     console.log(file);
//     console.log(file.buffer);
//     const params = {
//         Bucket: "healthcoach-fitness",
//         Key: file.originalname,
//         Body: file.buffer
//     };

//     try {
//         const data = await s3.upload(params).promise();
//         req.file = { path: data.Location };
//         console.log(data);
//         console.log(req.file);

//         next();
//     } catch (err) {
//         console.log("-------------------");
//         console.error(err);
//         res.status(400);
//         throw new Error('Upload failed');
//     }
// });

export const s3Multiple = asynHandler(async (req, res, next) => {
    console.log("reached s3");
    const s3 = new S3({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
        region: AWS_BUCKET_REGION
    })
    const response = [];
    const files = req.files;
    const videoFile = files.video[0]
    const previewFile = files.preview[0]
    const dietimageFile = files.dietimage[0]
    const media = [videoFile, previewFile, dietimageFile]
    let results={}
    let count=0


    
    const videoFileparams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${videoFile.fieldname}-${Date.now()}${path.extname(videoFile.originalname)}`,
        Body: videoFile.buffer
    };
    try {
        const data = await s3.upload(videoFileparams).promise();
       
        results.video=data.Location
        count++;
console.log('sucess');

        
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
       
        results.preview=data.Location
        count++;
console.log('sucess');

        
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
       
        results.dietimage=data.Location
        count++;
console.log('sucess');

        
    } catch (err) {
        console.error(err);
        res.status(400);
        throw new Error('Upload failed');
    }

console.log(count);

    if (count === 3) {
        req.files=results

        next();
    }


  
    // media.forEach(async file => {
    //     console.log(file.fieldname);
    //     console.log("foreeach");
    //     const params = {
    //         Bucket: AWS_BUCKET_NAME,
    //         Key: `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    //         Body: file.buffer
    //     };
    //     try {
    //         const data = await s3.upload(params).promise();
    //         response.push({ path: data.Location });

    //         if (response.length === media.length) {
    //             req.files = response;

    //             next();
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         res.status(400);
    //         throw new Error('Upload failed');
    //     }
    // });
});




