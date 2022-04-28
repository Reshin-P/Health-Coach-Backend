import express from "express";
import { getFamousTrainors, SignupTrainers, authtrainer } from '../controllers/trainersController.js'
const router = express.Router()


router.route('/trainers').get(getFamousTrainors)
router.route('/trainers').post(SignupTrainers)
router.route('/trainerlogin').post(authtrainer)

export default router