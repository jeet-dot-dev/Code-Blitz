import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  elo : {
    type : Number,
    default: 0
  },
  history:[{
    matchPlayedAt : {
      type:Date,
      default: Date.now
    },
    opponentUsername: {
      type: String,
      required: true
    },
    opponentElo: {
      type: Number,
      required: true
    },
    result : {
      type: String,
      enum: ['win', 'loss', 'draw'],
      required: true
    }
  }]
});



const User = mongoose.model("User",userSchema);

export default User;