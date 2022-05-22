import express from "express";
import multer from "multer";
import { addPrograms, deleteProgram, getallprograms, getworkouts } from '../controllers/programController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { s3UpdataSingle } from '../util/s3Bucket.js';
const router = express.Router()


const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })

router.route('/').get(getallprograms)
router.route('/program/:id').get(getworkouts)
router.route('/').post(upload.single("image"), s3UpdataSingle, addPrograms)
router.route('/:id').delete(protectAdmin, deleteProgram)




export default router;