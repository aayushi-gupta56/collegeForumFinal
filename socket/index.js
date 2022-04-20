const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];
const addUser = (userID, socketID)=>{
    const index = users.findIndex(function(o){
        return o.userID === userID
    })

    if(index===-1)
        users.push({userID, socketID})
    else{
        users.splice(index, 1);
        users.push({userID, socketID})
    }
}

const removeUser = (socketId)=>{
    const index = users.findIndex(function(o){
     return o.socketID === socketId;
    })
    users.splice(index, 1);
}

const findUser = (id)=>{
    return users.find(user=>user.userID === id);
}

io.on("connection", (socket)=>{

    /*---------------------------------------CONNECTION EVENT------------------------------*/
    socket.on("addUser", userID=>{
        console.log("User Connected..")
        addUser(userID,socket.id)
        io.emit("getUsers", users)
    })

    /*---------------------------------------DISCONNECT EVENT------------------------------*/
    socket.on("disconnect", ()=>{
        console.log("A user disconnected..");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })

    /*---------------------------------------SEND MESSAGES EVENT------------------------------*/
    socket.on("sendMessage", ({senderId, recieverId, text})=>{
        const u = findUser(recieverId);
        io.to(u?.socketID).emit("getMessage", {
            senderId,
            text
        })
    })
})