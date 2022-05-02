import express from "express";
const router = express.Router()
import { createConversation } from '../controllers/ConversationController.js'
router.route('/').post(createConversation)
// router.route('/:user/:traienr').get(getConversation)




export default router

