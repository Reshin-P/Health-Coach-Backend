import mongoose from "mongoose";


const connectDB = async () => {
    console.log("databaase connecrion checkin");
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })

        console.log("Database Connected");
    } catch (error) {
        console.log(`DB Error:${error}`);
    }
}

export default connectDB;