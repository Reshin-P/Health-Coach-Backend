import express from 'express'
const router = express.Router()
import { protectAdmin } from '../middleware/authMiddleware.js'
import { authAdmin, blockTrainer, blockUser, acceptTrainers, acceptTrainersRequest } from '../controllers/AdminControllers.js'



router.route('/').post(authAdmin)
router.route('/trainer/:id').post(protectAdmin, blockTrainer)
router.route('/user/:id').post(protectAdmin, blockUser)
router.route('/trainers').get(protectAdmin, acceptTrainers)
router.route('/accept/:id').patch(protectAdmin, acceptTrainersRequest)




export default router