import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './Config/DB-Config.js'
import userRouters from './routes/userRouters.js'
import ProgramRouter from './routes/programRouter.js'
import trainersRouter from './routes/trainersRouter.js'

const app = express()
app.use(cors({
    methods: "*",
    origin: "*"
}))
dotenv.config()


connectDB()
app.use(express.json())


app.use('/api',userRouters)
app.use('/api/program',ProgramRouter)
app.use('/api/trainers',trainersRouter)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server Running in Port ${PORT}`);
})


