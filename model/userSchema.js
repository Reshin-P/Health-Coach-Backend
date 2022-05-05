import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { compare } from "bcrypt";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    healthcondition: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    profilephoto: {
        type: String,
        default: null
    }
},
    {
        timestamps: true
    })

userSchema.methods.matchPassword = async function (enterPassword) {

    return await bcrypt.compare(enterPassword, this.password)

}

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)


export default User