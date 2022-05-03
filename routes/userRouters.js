import express from "express";
import { authUser, signUp, updataUser, updateWeight, getSingleUser } from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()



router.route('/').post(signUp)
router.route('/login').post(authUser)
//router.route('/profile').get(protect, getUserprofile)
router.route('/:id').put(protect, updataUser)
router.route('/weight/:id').put(updateWeight)
router.route('/:id').get(getSingleUser)



export default router