import express from "express";
import multer from "multer";
import { authtrainer, getFamousTrainors, getUser, SignupTrainers, uploadtrainerPhoto, userWorkouts, updateTrainer } from '../controllers/trainersController.js';
import { protectTrainers } from '../middleware/authMiddleware.js';
import { s3UpdataSingle } from '../util/s3Bucket.js';
const router = express.Router()
const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })



router.route('/trainers').get(getFamousTrainors)
router.route('/trainers').post(SignupTrainers)
router.route('/trainerlogin').post(authtrainer)
router.route('/:id').put(updateTrainer)
router.route('/getUsers/:id').get(getUser)
router.route('/userworkouts/:id').get(protectTrainers, userWorkouts)
router.route('/profilephoto').patch(protectTrainers, upload.single("photo"), s3UpdataSingle, uploadtrainerPhoto)

export default router