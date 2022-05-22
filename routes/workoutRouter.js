import express from "express";
const router = express.Router()
import { addworkout, getWorkout, allWorkout, deleteWorkout, updateWorkout, getAllTrainerWorkouts, blockUnblock } from '../controllers/workoutController.js'
import { s3Multiple } from '../util/s3Bucket.js'
import { protectTrainers } from '../middleware/authMiddleware.js'
import multer from "multer";

const storage = multer.memoryStorage({
    destination: (req, res, cb) => {
        cb(null, "")
    }
})
const upload = multer({ storage })


router.route('/').post(protectTrainers, upload.fields([{ name: 'video' }, { name: 'dietimage' }, { name: 'preview' }]), s3Multiple, addworkout)
router.route('/:id').get(getWorkout)
router.route('/').get(allWorkout)
router.route('/:id').delete(deleteWorkout)
router.route('/:id').put(updateWorkout)
router.route('/trainer/:id').get(getAllTrainerWorkouts)
router.route('/:id').patch(blockUnblock)





export default router