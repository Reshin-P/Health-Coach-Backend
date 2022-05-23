import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../model/userSchema.js";
import { decode } from "jsonwebtoken";
import Trainer from '../model/trainerSchema.js'
import Admin from "../model/AdminModel.js";


const protect = AsyncHandler(async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')

            if (req.user.isBlocked) {
                res.status(403)
                throw new Error("User Blocked")
            }
            next()
        } catch (error) {

            res.status(401)
            throw new Error('Not Authorized token failed')

        }
    } else {
        throw new Error('Not Authorized token failed')
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized no token")
    }

})






const protectTrainers = AsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.trainer = await Trainer.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)

            throw new Error('Not Authorized token failed')
        }
    } else {
        throw new Error('Not Authorized token failed')
    }

    if (!token) {
        res.status(401)
        throw new Error("No Authorised Trainer")
    }
})





const protectAdmin = AsyncHandler(async (req, res, next) => {
    let token


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await Admin.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized token failed')
        }
    } else {
        throw new Error('Not Authorized token failed')
    }

    if (!token) {
        res.status(401)
        throw new Error("No Authorised Traines")
    }
})
export { protect, protectTrainers, protectAdmin }