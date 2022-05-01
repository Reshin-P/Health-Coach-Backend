import express from "express";
const router = express.Router()
import { getallprograms, getworkouts } from '../controllers/programController.js'


router.route('/').get(getallprograms)
router.route('/program/:id').get(getworkouts)




export default router;