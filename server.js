import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import path from 'path'
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
import BannerRouter from './routes/BannerRouter.js'
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


app.use('/api/payment', PaymentRouter)
app.use('/api/user', userRouters)
app.use('/api/banner', BannerRouter)
app.use('/api/program', ProgramRouter)
app.use('/api/workout', workoutRouter)
app.use('/api/trainers', trainersRouter)
app.use('/api/admin', AdminRouter)
app.use('/api/message', MessageRouter)
app.use('/api/subcribe', SubcribeRouter)
app.use('/api/conversation', ConversationRouter)


// const __dirname = path.resolve()
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) =>
//       res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     )
//   } else {
//     app.get('/', (req, res) => {
//       res.send('API is running....')
//     })
//   }
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT


server.listen(PORT, () => {
  console.log(`Server Running in Port ${PORT}`);
})


