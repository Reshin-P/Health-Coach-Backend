import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './Config/DB-Config.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import ProgramRouter from './routes/programRouter.js'
import trainersRouter from './routes/trainersRouter.js'
import userRouters from './routes/userRouters.js'
import workoutRouter from './routes/workoutRouter.js'
import AdminRouter from './routes/AdminRouter.js'
import PaymentRouter from './routes/PaymentRouter.js'
import SubcribeRouter from './routes/SubcribeRouter.js'

const app = express()
app.use(cors({
    methods: "*",
    origin: "*"
}))
dotenv.config()


connectDB()
app.use(express.json())


app.use('/api/user', userRouters)
app.use('/api/program', ProgramRouter)
app.use('/api/trainers', trainersRouter)
app.use('/api/workout', workoutRouter)
app.use('/api/admin', AdminRouter)
app.use('/api/payment', PaymentRouter)
app.use('/api/subcribe', SubcribeRouter)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server Running in Port ${PORT}`);
})


