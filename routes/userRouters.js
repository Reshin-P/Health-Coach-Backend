import express from "express";
const router=express.Router()
import {authUser, signUp,getUserprofile} from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js'



router.route('/').post(signUp)
router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserprofile)




export default router