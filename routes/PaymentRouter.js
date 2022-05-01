import express from 'express'
const router = express.Router()
import { payment } from '../controllers/PaymentController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(protect, payment)















export default router



