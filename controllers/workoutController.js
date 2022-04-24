import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Workout from '../model/workoutSchema.js'
import objectId from 'mongoose'
import { getFilestream } from "../util/s3Bucket.js";



const addworkout = asyncHandler(async (req, res) => {
    console.log("controllers");
    console.log(req.trainer);
    console.log(req.files);
    const { workout, price, description, diet1, diet2, program } = req.body
    const video = req.files.video 
    const preview = req.files.video
    const dietimage = req.files.dietimage
    const trainer=req.trainer.name
    const trainerid=req.trainer._id
    const data = await Workout.create({
        workout,
        price,
        description,
        diet1,
        diet2,
        program,
        video,
        preview,
        dietimage,
        trainer,
        trainerid
    })
    res.status(200).json("Successfully Added Workout")
})


const getWorkout=asyncHandler(async(req,res)=>{
    console.log(req.params);
  
    const workout=await Workout.findById(req.params.id)
    console.log(workout);
    if(workout){
        
       
        
        res.status(200).json(workout)
    }else{
        throw new Error('database error')
    }

})


export {
    addworkout,
    getWorkout
}