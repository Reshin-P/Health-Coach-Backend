import mongoose from "mongoose";

const SubscribeSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentdetails: {
        type: Object,
        required: true
    },

    workout: {
        type: Object,
        required: true
    }
},
    {
        timestamps: true
    })

const Subscribe = mongoose.model("subcribe", SubscribeSchema)


export default Subscribe