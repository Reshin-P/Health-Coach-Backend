import { Server } from 'socket.io'



export const createSocket = (server) => {
    console.log("socket io server creating");
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })

}