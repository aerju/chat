import express, { urlencoded } from "express";
import mongoose from "mongoose";
import router from "./routes/userRouter.js";
import cors from 'cors'
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors())
const server = http.createServer(app);

 const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // console.log("Socket COnnected", socket.id);
  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(data);
  })
  socket.on("send_message",(data)=>{
    console.log(data);
    socket.to(data.room).emit("recieve_message",data)
  })
  socket.on("disconnect", () => {
    console.log("Socket Disconneted");
  });
});

const PORT = 4000;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',router)

server.listen(PORT, () => {
  mongoose
    .connect("mongodb+srv://42arju:Arju123@cluster0.uronlob.mongodb.net/")
    .then(() => {
      console.log("MongoDb Connected");
    })
    .catch((err) => {
      console.log("Mongoose Connection Error:", err);
    });
});
