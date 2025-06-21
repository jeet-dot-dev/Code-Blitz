import { getRoom } from "../store/roomStore.js";
import { io } from "../../index.js"; // Assuming you have a server.js file where you initialize your socket.io server

 const handleGameStart = (socket, data) => {
    const {roomId, token} = data;
    // Verify the token and start the game
    const room  =  getRoom(roomId);
    if (!room) {
        console.error("Room not found:4522", roomId);
        socket.emit("gameStartError", { error: "Room not found" });
        return;
    }
    room.isGameStarted = true;
    io.emit("gameStarted", { room });
}

export default handleGameStart