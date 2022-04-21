import asyncHandler from 'express-async-handler'
import sample from './sample.js'
import Program from '../model/programModel.js'

//@desc Get All Programs
//@route GET /api/programs
//@access Public


const getallprograms = asyncHandler(async (req, res) => {
    const sample = await Program.find()
    res.json(sample)
})


export { getallprograms }