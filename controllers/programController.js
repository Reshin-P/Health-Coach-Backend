import asyncHandler from 'express-async-handler'
import Program from '../model/programModel.js'
import Workout from '../model/workoutSchema.js'

// @desc Get All Programs
// @route GET /api/programs
// @access Public

const getallprograms = asyncHandler(async (req, res) => {
    const sample = await Program.find()
    res.json(sample)
})


// @desc Get  Programs wisw workouts
// @route GET /api/programs/:id
// @access Public

const getworkouts = asyncHandler(async (req, res) => {

    const workout = await Workout.find({ program: req.params.id })

    if (workout) {
        res.status(200).json(workout)
    } else {
        res.status(401)
        throw new Error("NO Workouts Found")
    }

})

export { getallprograms, getworkouts }