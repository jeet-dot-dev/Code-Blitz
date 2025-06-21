import jwt from "jsonwebtoken";
import { io } from "../../index.js";
import { getRoom } from "../store/roomStore.js";
import User from "../../models/userSchems.js";

export const handleJoinRoom = async (socket, data) => {
  //console.log("Join room request received:", data);
  const token = data.token;
  if (!token) {
    console.error("Token is required to join a room");
    socket.emit("error", { message: "Token required to join room" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.error("Decoded token:", decoded);
    const roomID = data.roomId;
    if (!roomID) {
      console.error("Room ID is required to join a room");
      socket.emit("error", { message: "Room ID required to join room" });
      return;
    }
    const room = getRoom(roomID);
    if (!room) {
      console.error("Room not found:", roomID);
      socket.emit("error", { message: "Room not found" });
      return;
    }
    // Check if the user is already in the room
    const existingUser = room.joiner.id === decoded.userId || room.creator.id === decoded.userId;
    if (existingUser) {
      console.error(`User ${decoded.userId} is already in room ${roomID}`);
      socket.emit("error", { message: "You are already in this room" });
      return;
    }
   

    // Notify other clients in the room
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.error("User not found:", decoded.userId);
      socket.emit("error", { message: "User not found" });
      return;
    }

    // Add the user to the room
    room.joiner = {
      id: user._id,
      name: user.username, // Use username instead of name
      elo: user.elo,
      joinedAt: Date.now(),
    };
    room.players.push(user._id);
            // check if the room is full or not
    if (room.players.length > 2) {
      console.error(`Room ${roomID} is full`);
      socket.emit("error", { message: "Room is full" });
      return;
    }
    //console.log(room);
    //console.log("players", room.players);

    socket.join(roomID);
    //console.log(`Socket ${socket.id} joined room ${roomID}`);

    socket.to(roomID).emit("roomMessage", {
      msg: `${user.username} has joined the room`, // Use username instead of name
      user: {
        userId: user._id,
        username: user.username, // Use username instead of name
      },
    });

    //console.log(`User ${user.username} joined room ${roomID}`); // Use username instead of name

    io.emit("roomJoined", room);
  } catch (err) {
    console.error("Error joining room:", err);
    socket.emit("error", { message: "Invalid token" });
  }
};
