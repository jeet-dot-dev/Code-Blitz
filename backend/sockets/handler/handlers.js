import jwt from 'jsonwebtoken';
import { handleCreateRoom } from '../controllers/roomCreated';

export const socketHandlers = (socket) => {
    // console.log("User connected:", socket.id);
    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
    
    socket.on("joinRoom",(data)=>{
    handleJoinRoom(socket,data);
  })

  socket.on("getRoomData", (data) => {
  //console.log("getRoomData event received for room:", data);
  const room = getRoom(data.roomId);
  //console.log("Room data:", room);
  if (!room) {
    console.error("Room not found:", data);
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