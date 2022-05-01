import mongoose from "mongoose";

const SubscribeSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    workout: {
        type: Object,
        required: true
    }
},
    {
        timestamp: true
    })

const Subscribe = mongoose.model("subcribe", SubscribeSchema)


export default Subscribe