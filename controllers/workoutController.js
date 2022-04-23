import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Workout from '../model/workoutSchema.js'



const addworkout = asyncHandler(async (req, res) => {
    console.log("controllers");
    console.log(req.files);
    const { workout, price, description, diet1, diet2, program } = req.body
    const video = req.files.video
    const preview = req.files.video
    const dietimage = req.files.dietimage
    const data = await Workout.create({
        workout,
        price,
        description,
        diet1,
        diet2,
        program,
        video,
        preview,
        dietimage
    })
    res.status(200).json("Successfully Added Workout")


})



export {
    addworkout
}