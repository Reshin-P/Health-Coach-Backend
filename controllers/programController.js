import asyncHandler from 'express-async-handler'
import Program from '../model/programModel.js'
import Workout from '../model/workoutSchema.js'

// @desc Get All Programs
// @route GET /api/programs
// @access Public

const getallprograms = asyncHandler(async (req, res) => {

    const data = await Program.find({ isDeleted: false })
    if (data) {
        if (data.length == 0) {
            throw new Error("no program added")
        } else {
            res.json(data)
        }
    } else {
        throw new Error("something went wrong")
    }
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

// @desc Post  Add Programs
// @route Post /api/programs
// @access Admin

const addPrograms = asyncHandler(async (req, res) => {
    try {
        const program = await Program.create({
            programname: req.body.name,
            image: req.file.path
        })
        res.status(200).json(program)
    } catch (error) {
        throw new Error("something went wrong")
    }

})

// @desc Delete  Delete Programs
// @route DELETE /api/programs
// @access Admin
const deleteProgram = asyncHandler(async (req, res) => {
    const data = await Program.findById(req.params.id)
    if (data) {
        data.isDeleted = true
        await data.save()
        res.status(200).json(`${data.programname} is deleted`)
    } else {
        throw new Error("No Program Found")
    }

})

export { getallprograms, getworkouts, addPrograms, deleteProgram }