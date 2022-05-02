import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import connectDB from './Config/DB-Config.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import AdminRouter from './routes/AdminRouter.js'
import PaymentRouter from './routes/PaymentRouter.js'
import ProgramRouter from './routes/programRouter.js'
import SubcribeRouter from './routes/SubcribeRouter.js'
import trainersRouter from './routes/trainersRouter.js'
import userRouters from './routes/userRouters.js'
import workoutRouter from './routes/workoutRouter.js'
import MessageRouter from './routes/MessageRouter.js'
import ConversationRouter from './routes/ConversationRouter.js'
import { createSocket } from './util/Socket-Io.js'

const app = express()
const server = http.createServer(app)
createSocket(server)

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
app.use('/api/message', MessageRouter)
app.use('/api/conversation', ConversationRouter)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server Running in Port ${PORT}`);
})


