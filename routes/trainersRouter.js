import express from "express";
import { getFamousTrainors, SignupTrainers, authtrainer, getUser, userWorkouts } from '../controllers/trainersController.js'
const router = express.Router()
import { protectTrainers } from '../middleware/authMiddleware.js'


router.route('/trainers').get(getFamousTrainors)
router.route('/trainers').post(SignupTrainers)
router.route('/trainerlogin').post(authtrainer)
router.route('/getUsers/:id').get(getUser)
router.route('/userworkouts/:id').get(protectTrainers, userWorkouts)
export default router