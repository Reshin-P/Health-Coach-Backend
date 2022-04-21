import express from "express";
const router=express.Router()
import {getallprograms} from '../controllers/programController.js'


router.route('/').get(getallprograms)




export default router;