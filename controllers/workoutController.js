import asyncHandler from "express-async-handler";
import Workout from '../model/workoutSchema.js';
import mongoose from "mongoose";



//@desc Post Add-Workouts
//@route POST /api/workout
//@access Trainer


const addworkout = asyncHandler(async (req, res) => {

    const { workout, price, description, diet1, diet2, program } = req.body
    const video = req.files.video
    const preview = req.files.preview
    const dietimage = req.files.dietimage
    const trainer = req.trainer.name
    const trainerid = mongoose.Types.ObjectId(req.trainer._id)
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



//@desc GET Single Workout
//@route POST /api/workout
//@access Public

const getWorkout = asyncHandler(async (req, res) => {

    const workout = await Workout.findById(req.params.id)
    if (workout) {

        res.status(200).json(workout)
    } else {
        throw new Error('database error')
    }

})



//@desc Get All-Workouts
//@route POST /api/workout
//@access Pubic

const allWorkout = asyncHandler(async (req, res) => {
    const allWorkout = await Workout.find({ isDeleted: "false" })
    res.status(200).json(allWorkout)
})


//@desc  Delete-Workouts
//@route Delete /api/workout/:id
//@access Trainer

const deleteWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
        res.status(404);
        throw new Error('workout not found');
    }
    workout.isDeleted = true;
    await workout.save()
    return res.status(204).json({});
})

//@desc  Update-Workouts
//@route Patch /api/workout/:id
//@access Trainer


const updateWorkout = asyncHandler(async (req, res) => {

    const data = await Workout.findById(req.params.id)
    if (!data) {
        throw new Error("Workout Not Found")
    }
    data.workout = req.body.workout
    data.price = req.body.price
    data.description = req.body.description
    data.diet1 = req.body.diet1
    data.diet2 = req.body.diet2
    await data.save()
    return res.status(204).json("update sucess");

})


//@desc Get All Traiener Workout
//@route Patch /api/workout/trainer/:id
//@access Public


const getAllTrainerWorkouts = asyncHandler(async (req, res) => {
    console.log("reache here traienr");
    console.log(req.params.id);
    const workout = await Workout.find({ trainerid: req.params.id })
    console.log(workout);
    if (workout) {
        if (workout.length == 0) {
            throw new Error("No Workout Addded")
        } else {
            res.status(200).json(workout)
        }
    } else {
        throw new Error("Something went wrong")
    }

})




const blockUnblock = asyncHandler(async (req, res) => {
    console.log("eeeeeee");
    console.log(req.body);
    const { id, value } = req.body
    const workout = await Workout.findById(id)
    console.log(workout);
    if (value === "block") {
        workout.isBlocked = true
        await workout.save()
        res.status(200).json("Workout Blocked")
    } else if (value === "unblock") {
        console.log("else if worked");
        workout.isBlocked = false
        await workout.save()
        res.status(200).json("Workout UnBlocked")

    }

})

export {
    addworkout,
    getWorkout,
    allWorkout,
    deleteWorkout,
    updateWorkout,
    getAllTrainerWorkouts,
    blockUnblock
};
