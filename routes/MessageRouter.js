import express from 'express'
const router = express.Router()
import { addMessages, getMessages, getReceiver } from '../controllers/MessageController.js'


router.route('/').post(addMessages)
router.route('/:id').get(getMessages)
router.route('/receiver/:id').get(getReceiver)


export default router