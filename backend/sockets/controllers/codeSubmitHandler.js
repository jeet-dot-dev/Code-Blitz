import { io } from "../../server.js";
import User from "../../models/userSchema.js";
import {
  createSubmission,
  getSubmission,
  getRoom,
  updateRoom,
} from "../store/roomStore.js";
import analyzeBattle from "../ai/analyze.js";



const handleSubmitCode = async (socket, data) => {
  try {
    // 🟩 Validate the user
    const user = await User.findById(data.playerId);
    if (!user) {
      console.error("User not found with ID:", data.playerId);
      socket.emit("error", { message: "User not found!" });
      return;
    }

    const roomID = data?.room?.roomID;
    if (!roomID) {
      console.error("Room ID missing in submission data");
      socket.emit("error", { message: "Room ID missing!" });
      return;
    }

    // 🟩 Retrieve or initialize the submissions array
    let subExists = getSubmission(roomID);
    if (!subExists) {
      subExists = [];
      createSubmission(roomID, subExists);
      console.log("hi");
    }

    // 🟩 Check if the user has already submitted (optional but recommended)
    const alreadySubmitted = subExists.some(
      (s) => s.playerId.toString() === user._id.toString()
    );
    if (alreadySubmitted) {
      socket.emit("codeSubmissionMsg", {
        msg: "You have already submitted your code! Waiting for opponent...",
      });
      return;
    }

    // 🟩 Create the submission data
    const subData = {
      playerId: user._id,
      playerName: user.name,
      language: data.language,
      code: data.submitted_code,
    };

    subExists.push(subData);
    //console.log(subExists);

    // 🟩 Handle result
    if (subExists.length === 2) {
      // Both players submitted: Prepare data for AI
      io.emit("resultmsg",{msg:"Both submitted code waiting for results ..."});
      console.log("hello");
      const openAiData = {
        codeSubmit: subExists,
        questionInfo: {
          topic: data.room.topic,
          difficulty: data.room.difficulty,
          questions: data.room.questions.questions,
        },
      };

      // 🟩 Call AI evaluation
      const result = await analyzeBattle(openAiData);

      // 🟩 Update ELO, History, etc. in DB
      // TODO: Implement actual DB updates
      console.log("Updating ELO and history...");

      // 🟩 Notify both players in the room
      io.to(roomID).emit("result", result);

      // 🟩 Optional: Mark room as "ended"
      updateRoom(roomID, { battleStarted: false, endTime: Date.now() });
    } else {
      // 🟩 Only one player submitted so far
      socket.emit("codeSubmissionMsg", {
        msg: "Your code has been submitted. Waiting for your opponent...",
      });
    }
    //console.log("Current Submissions:", subExists);
  } catch (error) {
    console.error("Error handling code submission:", error);
    socket.emit("error", { message: "Error submitting code!" });
  }
};

export default handleSubmitCode;
