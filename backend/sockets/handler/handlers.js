import jwt from 'jsonwebtoken';
import { handleCreateRoom } from '../controllers/roomCreated.js';
import { handleRoomJoined } from '../controllers/roomJoined.js';
import { getRoom } from '../store/roomStore.js';
import { io } from '../../index.js';
import handleGameStart from '../controllers/gameStart.js';
import handleSubmitCode from '../controllers/codeSubmitHandler.js';


export const socketHandlers = (socket) => {
    // console.log("User connected:", socket.id);
    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
    
    socket.on("joinRoom",(data)=>{
    handleRoomJoined(socket,  data);
  })

  socket.on("getRoomData", (data) => {
  console.log("getRoomData event received for room:", data.roomId);
  console.log(data.roomId)
  const room = getRoom(data.roomId);
  console.log("Room data:", room);
  if (!room) {
    console.error("Room not foundhello:", data);
    socket.emit("roomData", { error: "Room not found" });
    return;
  }
  socket.emit("roomData", { roomData: room });
});

// game start logic 
socket.on("startGame",(data) =>{
  handleGameStart(socket,data);

});

socket.on("codeSubmited",(data)=>{
  handleSubmitCode(socket,data);
})

}