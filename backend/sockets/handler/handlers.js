import jwt from 'jsonwebtoken';
import { handleCreateRoom } from '../controllers/roomCreated';

export const socketHandlers = (socket) => {
    // console.log("User connected:", socket.id);
    socket.on("createRoom", (data) => handleCreateRoom(socket, data));
}