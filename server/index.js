const express = require("express")

const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
});

app.use(express.json())

const PORT = process.env.PORT || 5000

const rooms = new Map();

const rooms2 = {}

app.post('/rooms', (req, res) => {
  const {userName, roomId} = req.body
  if(!rooms.has(roomId)){
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []]
      ])
    )
  }
  res.send()
})

app.get('/rooms',(req,res)=>{
  res.json(rooms);
})


io.on('connection',socket=>{
  socket.on('ROOM:JOIN',({roomId,userName})=>{
    //This code not working -->
    socket.join(roomId)
    rooms.get(roomId).get('users').set(socket.id,userName)
    const users = [...rooms.get(roomId).get('users').values()]
    socket.to(roomId).broadcast.emit('ROOM:JOINED',users)
    })
    console.log('soket.io connection and user i:'+socket.id);
})

http.listen(PORT,err=>{
    if(err){
        throw Error(err);
    }
    console.log(`server startet on PORT ${PORT}`);
})