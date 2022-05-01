import express from "express";
const router = express.Router()
import { subcribedWorkouts } from '../controllers/SubcribeController.js'

router.route('/:id').get(subcribedWorkouts)








export default router;