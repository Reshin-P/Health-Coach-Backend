import asyncHandler from 'express-async-handler';
import Admin from '../model/AdminModel.js';
import Trainer from '../model/trainerSchema.js';
import User from '../model/userSchema.js';
import generateToken from '../util/generateToken.js';





//@desc Post Auth-Admin
//@route POST /api/admin
//@access Admin


const authAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ username: req.body.username })
    if (admin.password == req.body.password) {
        if (admin) {
            res.status(200).json({
                username: admin.username,
                token: generateToken(admin._id)

            })
        } else {
            throw new Error("Invalid Username or Password")
        }
    }
})



//@desc Post Block Unblock Trainer
//@route POST /api/admin/trainers/:id
//@access Admin


const blockTrainer = asyncHandler(async (req, res) => {

    const trainer = await Trainer.findById(req.params.id)
    if (req.body.value === "block") {
        trainer.isBlocked = true
        await trainer.save()
        res.status(200).json("blocked")
    } else if (req.body.value === "unblock") {
        trainer.isBlocked = false
        await trainer.save()
        res.status(200).json("blocked")
    }
})


//@desc Post Block Unblock User
//@route POST /api/admin/user/:id
//@access Admin


const blockUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (req.body.value === "block") {
        user.isBlocked = true
        await user.save()
        res.status(200).json("blocked")
    } else if (req.body.value === "unblock") {
        user.isBlocked = false
        await user.save()
        res.status(200).json("blocked")
    }
})


//@desc Post Block Unblock User
//@route Get /api/admin/user/:id
//@access Admin

const acceptTrainers = asyncHandler(async (req, res) => {
    const trainers = await Trainer.find({ isAccept: false })
    if (trainers) {
        res.status(200).json(trainers)
    } else {
        throw new Error("No Trainers Request")
    }

})


//@desc Patch Accept Reject Trainer
//@route Get /api/admin/accept/:id
//@access Admin

const acceptTrainersRequest = asyncHandler(async (req, res) => {

    const trainer = await Trainer.findById(req.params.id)
    if (trainer) {
        trainer.isAccept = true
        await trainer.save()
        res.status(200).json(`${trainer.name} Signup Request  Accepted`)
    } else {
        throw new Error("no trainer found")
    }

})


export {
    acceptTrainers,
    authAdmin,
    blockTrainer,
    blockUser,
    acceptTrainersRequest
};

