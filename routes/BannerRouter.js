import express from "express";
import multer from "multer";
import { addBanner, getBanner } from '../controllers/BannerController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { s3Banner } from '../util/s3Bucket.js'

const router = express.Router()

const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })

router.route('/').get(getBanner)
router.route('/').post(protectAdmin, upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), s3Banner, addBanner)




export default router;