import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../store/roomStore";

const Waiting = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const roomData = useRoomStore((state) => state.roomData);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const roomID = localStorage.getItem("roomID");
    if (roomID) {
      socket.emit("getRoomData", { roomId: roomID });
    }

    socket.on("roomJoined", (newData) => {
      console.log("Player joined:", newData);
    });

    socket.on("roomMessage", (message) => {
      console.log("Room Message:", message.msg);
    });

    socket.on("gameStarted", (data) => {
      console.log("Game started:", data);
      navigate(`/room/${data?.room?.roomID}`);
    });

    return () => {
      socket.off("roomData");
      socket.off("roomJoined");
      socket.off("roomMessage");
      socket.off("gameStarted");
    };
  }, [socket, navigate]);

  const token = localStorage.getItem("Token");
  const currentUserId = localStorage.getItem("id");
  const isRoomOwner = currentUserId === roomData?.creator?.id;
  const bothPlayersPresent = roomData?.players?.length === 2;

  const startGame = () => {
    if (!socket || !roomData?.roomID) return;
    setIsStarting(true);
    socket.emit("startGame", { roomId: roomData.roomID, token });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white px-4 py-6">
      <div className="w-full max-w-4xl bg-[#1A1A1A] border border-purple-700 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Waiting Room</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-[#121212] p-4 rounded-xl border border-purple-600">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Creator</h3>
            <p>{roomData?.creator?.name || "Loading..."}</p>
          </div>
          <div className="bg-[#121212] p-4 rounded-xl border border-blue-600">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Joiner</h3>
            <p>{roomData?.joiner?.name || "Waiting for player..."}</p>
          </div>
        </div>

        {bothPlayersPresent && (
          <div className="mt-4">
            {isRoomOwner ? (
              <button
                onClick={startGame}
                disabled={isStarting}
                className="w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                {isStarting ? "Starting Game..." : "Start Game"}
              </button>
            ) : (
              <div className="text-center text-yellow-400">
                Waiting for host to start the game...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Waiting;
