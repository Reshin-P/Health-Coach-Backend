import { Server, Socket } from 'socket.io'



export const createSocket = (server) => {
    console.log("socket io server creating");
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    let user = [];
    const addUser = (userID, SocketID) => {
        !user.some(user => user.userID === userID) &&
            user.push({ userID, SocketID })

    }


    const removeUser = (socketId) => {
        user = user.filter((user) => user.SocketID !== socketId)
    }

    const getUser = (userId) => {
        user = user.find((user) => user.userID === userId)
    }




    io.on("connection", (Socket) => {
        console.log("a user connected");



        Socket.on("addUser", userId => {
            addUser(userId, Socket.id)
            io.emit("getUsers", user)
        })

        Socket.on("sendMessage", ({ senderId, reciverId, text }) => {
            const user = getUser(reciverId)
            io.to(user.SocketID).emit("getMessage", {
                senderId,
                text
            })
        })

        Socket.on("disconnect", () => {
            removeUser(Socket.id)
            console.log("a user disconnected");
            io.emit("getUsers", user)
        })
    })



}

