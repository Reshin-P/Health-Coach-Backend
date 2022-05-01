import asyncHandler from 'express-async-handler'
import Admin from '../model/AdminModel.js'




//@desc Post Auth-Admin
//@route POST /api/admin
//@access Admin


const authAdmin = asyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ username: req.body.username })
    if (admin.password == req.body.password) {
        if (admin) {
            res.status(200).json({ username: admin.username })
        } else {
            throw new Error("Invalid Username or Password")
        }
    }
})







export {
    authAdmin
}
