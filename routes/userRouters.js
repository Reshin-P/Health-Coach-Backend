import express from "express";
import multer from "multer";
import { authUser, signUp, updataUser, updateWeight, getSingleUser, uploadPhoto } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js'
import { s3UpdataSingle } from '../util/s3Bucket.js'
const router = express.Router()

const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })


router.route('/').post(signUp)
router.route('/login').post(authUser)
//router.route('/profile').get(protect, getUserprofile)
router.route('/:id').put(protect, updataUser)
router.route('/weight/:id').put(updateWeight)
router.route('/:id').get(getSingleUser)
router.route('/profilephoto').patch(protect, upload.single("photo"), s3UpdataSingle, uploadPhoto)


export default router