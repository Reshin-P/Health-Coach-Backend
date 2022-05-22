import asyncHandler from "express-async-handler";
import Subscribe from '../model/SubcribeModel.js'



const subcribedWorkouts = asyncHandler(async (req, res) => {
    console.log("reached subcribed workout");
    console.log(req.params.id);

    const workout = await Subscribe.find({ user: req.params.id })
    console.log(workout);
    res.json(workout)

})


export {
    subcribedWorkouts
}