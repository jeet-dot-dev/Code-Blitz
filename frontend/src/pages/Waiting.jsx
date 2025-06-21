import { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";

const Waiting = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const roomID = localStorage.getItem("roomID");
    if (roomID) {
      socket.emit("getRoomData", { roomId: roomID });
    }

    return () => {
      socket.off("roomData");
    };
  }, [socket]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg">Waiting for room data...</p>
      </div>
    </div>
  );
};

export default Waiting;
