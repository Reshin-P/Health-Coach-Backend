import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const trainerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
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
    password: {
        type: String,
        required: true
    },
    certifications: {
        type: Array,
        required: true
    },
    streams: {
        type: Array,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true
    },
    
    isAccept:{
        type:Boolean,
        default:false,
        required:true
    }
},
    {
        timestamps: true
    })



trainerSchema.methods.matchPassword = async function (enterPassword) {

    return await bcrypt.compare(enterPassword, this.password)

}

trainerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Trainer = mongoose.model('Trainer', trainerSchema)

export default Trainer