import express from "express";
const router=express.Router()
import {addworkout}  from '../controllers/workoutController.js'
import { s3Multiple } from '../util/s3Bucket.js'

import multer from "multer";

const storage=multer.memoryStorage({
    destination:(req,res,cb)=>{
        cb(null,"")
    }
})






const upload = multer({ storage })
router.route('/').post(upload.fields([{name:'video'}, {name:'dietimage'},{name:'preview'}]),s3Multiple,addworkout)












export default router