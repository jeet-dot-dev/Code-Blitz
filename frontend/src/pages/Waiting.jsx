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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Waiting Room</h2>

      <div className="bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-purple-400 mb-2">Creator</h3>
          <p className="text-white text-sm">
            {roomData?.creator?.name || "Loading..."}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-400 mb-2">Joiner</h3>
          <p className="text-white text-sm">
            {roomData?.joiner?.name || "Waiting for player..."}
          </p>
        </div>

        {bothPlayersPresent && (
          <>
            {isRoomOwner ? (
              <button
                onClick={startGame}
                disabled={isStarting}
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition"
              >
                {isStarting ? "Starting Game..." : "Start Game"}
              </button>
            ) : (
              <div className="text-center text-yellow-400">
                Waiting for host to start the game...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Waiting;
