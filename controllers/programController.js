import asyncHandler from 'express-async-handler'
import sample from './sample.js'
import Program from '../model/programModel.js'
import Workout from '../model/workoutSchema.js'

//@desc Get All Programs
//@route GET /api/programs
//@access Public


const getallprograms = asyncHandler(async (req, res) => {
    const sample = await Program.find()
    res.json(sample)
})


const getworkouts = asyncHandler(async (req,res) => {
    
    console.log(req.params.id );
  console.log("------------------------------------frefdfdff");
    const workout=await Workout.find({program:req.params.id})
   
    if(workout){
        res.status(200).json(workout)
    }else{
        res.status(401)
        throw new Error("NO Workouts Found")
    }

})

export { getallprograms,getworkouts }