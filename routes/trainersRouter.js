import express from "express";
import multer from "multer";
import { authtrainer, getFamousTrainors, getUser, getSingleUser, SignupTrainers, uploadtrainerPhoto, userWorkouts, updateTrainer } from '../controllers/trainersController.js';
import { protectTrainers } from '../middleware/authMiddleware.js';
import { s3UpdataSingle } from '../util/s3Bucket.js';
const router = express.Router()
const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })


router.route('/').get(getFamousTrainors)
router.route('/:id').get(protectTrainers, getSingleUser)
router.route('/trainers').post(SignupTrainers)
router.route('/trainerlogin').post(authtrainer)
router.route('/:id').put(protectTrainers, updateTrainer)
router.route('/getusers/:id').get(protectTrainers, getUser)
router.route('/userworkouts/:id').get(protectTrainers, userWorkouts)
router.route('/profilephoto').patch(protectTrainers, upload.single("photo"), s3UpdataSingle, uploadtrainerPhoto)

export default router