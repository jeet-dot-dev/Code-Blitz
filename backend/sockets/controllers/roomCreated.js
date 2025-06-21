import jwt from "jsonwebtoken";
import { io } from "../../index.js";
import User from "../../models/userSchems.js";
import getQuestionsFromOpenAI from "../ai/openai.js";
import { createRoom } from "../store/roomStore.js";


export const handleCreateRoom = async (socket, data) => {
  const token = data.token; // or pass in event data

  //console.log("Creating room with data:", data);
  //console.log(process.env.JWT_SECRET);
  //console.log("Token received:", token);
  if (!token) {
    //console.log("Token is required to create a room");
    socket.emit("error", { message: "Token required to create room" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      //console.log("User not found:", decoded.userId);
      socket.emit("error", { message: "User not found" });
      return;
    }
    const questions = await getQuestionsFromOpenAI(
      data.topic,
      data.difficulty
    );
    if (!questions) {
      socket.emit("error", { message: "Failed to fetch questions" });
      return;
    }
    //console.log("Questions fetched:", questions);
    const roomID = Math.random().toString(36).substring(2, 8);
    const roomData = {
      topic: data.topic,
      roomID : roomID,
      roomType: data.roomType,
      difficulty: data.difficulty,
      questions: questions,
      creator: { id: decoded.userId, name: user.name, elo: user.elo, joinedAt: Date.now() },
      joiner: {},
      players: [decoded.userId],
      battleStarted: false,
      startTime: null,
      endTime: null,
      submissions: {},
    };
    createRoom(roomID, roomData);
    socket.join(roomID);
    socket.emit("roomCreated", {
      roomData
    });
  } catch (err) {
    console.error("Error creating room:", err);
    socket.emit("error", { message: "Invalid token" });
  }
};
