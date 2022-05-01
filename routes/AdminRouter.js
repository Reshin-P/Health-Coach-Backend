import express from 'express'
const router = express.Router()
import { authAdmin } from '../controllers/AdminControllers.js'

router.route('/').post(authAdmin)









export default router