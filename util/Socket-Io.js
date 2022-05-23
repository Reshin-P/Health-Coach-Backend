import { Server } from 'socket.io'



export const createSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    let user = [];

    // FOR ADD USER
    const addUser = (userID, SocketID) => {
        !user.some(user => user.userID === userID) &&
            user.push({ userID, SocketID })


    }

    //REMOVE USER

    const removeUser = (socketId) => {

        user = user.filter((user) => user.SocketID !== socketId)
    }

    //GET SOCKETID USING USER ID

    const getUser = (reciverId) => {

        return user.find((user) => user.userID === reciverId)

    }


    io.on("connection", (Socket) => {



        // ADD USER

        Socket.on("addUser", userId => {
            addUser(userId, Socket.id)
            io.emit("getUsers", user)
        })

        Socket.on("sendMessage", ({ senderId, reciverId, text }) => {

            const getedUser = getUser(reciverId)
            if (getedUser) {
                let Sid = getedUser.SocketID
                io.to(Sid).emit("getMessage", {
                    senderId,
                    text
                })
            }
        })

        Socket.on("disconnect", () => {
            removeUser(Socket.id)
            io.emit("getUsers", user)
        })

    })


}

