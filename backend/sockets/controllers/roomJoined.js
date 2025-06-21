import jwt from 'jsonwebtoken';
import User from '../../models/userSchems.js';
import { getRoom } from '../store/roomStore.js';

export const handleRoomJoined = async (socket, data) => {
  try {
    const { roomId, token } = data;

    // Verify token
    if (!token) {
      socket.emit('error', { message: 'Authentication token required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      socket.emit('error', { message: 'User not found' });
      return;
    }

    // Check if room exists
    const room = getRoom(roomId);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    // Join the socket room
    socket.join(roomId);

    // Add user to room
    if (!room.joiner.id) {
      room.joiner = {
        id: user._id,
        username: user.username,
        email: user.email
      };
    }

    // Notify room about new joiner
    socket.to(roomId).emit('userJoined', {
      user: {
        id: user._id,
        username: user.username
      },
      room: room
    });

    // Send confirmation to the user
    socket.emit('roomJoined', {
      message: 'Successfully joined room',
      roomId: roomId,
      room: room
    });

  } catch (error) {
    console.error('Error in handleRoomJoined:', error);
    socket.emit('error', { message: 'Failed to join room' });
  }
};