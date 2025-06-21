import jwt from 'jsonwebtoken';
import { handleCreateRoom } from '../controllers/roomCreated.js';
import { handleJoinRoom } from '../controllers/joinRoom.js';

export const socketHandlers = (socket) => {
    // console.log("User connected:", socket.id);
    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
    
    socket.on("joinRoom",(data)=>{
    handleJoinRoom(socket,data);
  })
}