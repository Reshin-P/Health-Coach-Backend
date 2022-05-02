import express from "express";
import { getFamousTrainors, SignupTrainers, authtrainer, getUser } from '../controllers/trainersController.js'
const router = express.Router()


router.route('/trainers').get(getFamousTrainors)
router.route('/trainers').post(SignupTrainers)
router.route('/trainerlogin').post(authtrainer)
router.route('/getUsers/:id').get(getUser)
export default router