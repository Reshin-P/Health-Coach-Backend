import express from 'express'
const router = express.Router()
import { addMessages, getMessages } from '../controllers/MessageController.js'


router.route('/').post(addMessages)
router.route('/:id').get(getMessages)


export default router