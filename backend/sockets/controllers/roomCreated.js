import jwt from 'jsonwebtoken';
import User from '../../models/userSchems.js';
import getQuestionsFromAi from '../ai/GenQuestions.js';
import { createRoom } from '../store/roomStore.js';
export const handleCreateRoom = async (socket, data) => {
    const token = data.token;
    if(!token) {
        console.error("Token is required to create a room");
        socket.emit("error", { message: "Token is required to create room" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            console.error("User not found:", decoded.userId);
            socket.emit("error", { message: "User not found" });
            return;
        }
        const questions = await getQuestionsFromAi(data.topic, data.questions);
        if (!questions || questions.length === 0) {
            console.error("Error geting questions from AI")
            socket.emit("error", { message: "Error getting questions from AI"})
            return;
        }
        console.log("Questions generated successfully:", questions);
        const roomID = Math.random().toString(36).substring(2, 8);
        const roomData = {
            topic: data.topic,
            roomID: roomID,
            roomType: data.roomType,
            questions: questions.questions,
            creator: { id: decoded.userId, name: user.username, elo: user.elo, joinedAt: Date.now() },
            joiner: {},
            players: [decoded.userId],
            battleStarted: false,
            startTime: null,
            endTime: null,
            submissions: {},
        };
        createRoom(roomID, roomData);
        socket.join(roomID);
        socket.emit("roomCreated", {roomData});
        
    }catch (error) {
        console.error("Error in handleCreateRoom:", error);
        socket.emit("error", { message: "Internal server error" });
        return;
    }
}

// Room management controllers
export const handleRoomCreated = (socket, io) => {
  socket.on('createRoom', (data) => {
    try {
      const { roomName, userId } = data;
      
      if (!roomName || !userId) {
        socket.emit('error', { message: 'Room name and user ID are required' });
        return;
      }
      
      const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      socket.join(roomId);
      socket.emit('roomCreated', { 
        roomId, 
        roomName, 
        message: `Room ${roomName} created successfully` 
      });
      
      console.log(`Room ${roomName} (${roomId}) created by user ${userId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      socket.emit('error', { message: 'Failed to create room' });
    }
  });
};