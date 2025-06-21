import jwt from "jsonwebtoken";
import { io } from "../../index.js";
import { getRoom } from "../store/roomStore.js";
import User from "../../models/userSchems.js";

export const handleRoomJoined = async (socket, data) => {
  //console.log("Join room request received:", data);
  const token = data.token;
  if (!token) {
    //console.log("Token is required to join a room");
    socket.emit("error", { message: "Token required to join room" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded token:", decoded);
    const roomID = data.roomId;
    if (!roomID) {
      //console.log("Room ID is required to join a room");
      socket.emit("error", { message: "Room ID required to join room" });
      return;
    }
    const room = getRoom(roomID);
    if (!room) {
      //console.log("Room not found:", roomID);
      socket.emit("error", { message: "Room not found" });
      return;
    }
    // Check if the user is already in the room
    const existingUser = room.joiner.id === decoded.userId || room.creator.id === decoded.userId;
    if (existingUser) {
      //console.log(`User ${decoded.userId} is already in room ${roomID}`);
      socket.emit("error", { message: "You are already in this room" });
      return;
    }
   

    // Notify other clients in the room
    const user = await User.findById(decoded.userId);
    if (!user) {
      //console.log("User not found:", decoded.userId);
      socket.emit("error", { message: "User not found" });
      return;
    }

    // Add the user to the room
    room.joiner = {
      id: user._id,
      name: user.name,
      elo: user.elo,
      joinedAt: Date.now(),
    };
    room.players.push(user._id);
     // check if the room is full or not
    if (room.players.length > 2) {
      //console.log(`Room ${roomID} is full`);
      socket.emit("error", { message: "Room is full" });
      return;
    }
    // Update the room in the store
    //console.log(room);
    //console.log("players", room.players);

    socket.join(roomID);
    //console.log(`Socket ${socket.id} joined room ${roomID}`);

    socket.to(roomID).emit("roomMessage", {
      msg: `${user.name} has joined the room`,
      user: {
        userId: user._id,
        username: user.name,
      },
    });

    //console.log(`User ${user.name} joined room ${roomID}`);
    // Optionally, you can send the room data back to the client
    io.emit("roomJoined", room);
  } catch (err) {
    console.error("Error joining room:", err);
    socket.emit("error", { message: "Invalid token" });
  }
};
