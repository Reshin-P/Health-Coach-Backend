import asyncHandler from "express-async-handler";
import Subscribe from '../model/SubcribeModel.js'

// @desc get  Add subcribe
// @route GET /api/subcribe
// @access USER

const subcribedWorkouts = asyncHandler(async (req, res) => {

    try {
        const workout = await Subscribe.find({ user: req.params.id })

        res.json(workout)

    } catch (error) {
        throw new Error("something went wrong")
    }
})


export {
    subcribedWorkouts
}