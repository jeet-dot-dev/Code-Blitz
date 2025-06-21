import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import useRoomStore from "../store/roomStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Clock, Users, Trophy, Hash, BookOpen, Play } from "lucide-react";
import useFetchData from "../hooks/fetchdata";
import { toast } from "sonner";

const Waiting = () => {
  const socket = useContext(SocketContext);
  const roomData = useRoomStore((state) => state.roomData);
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const [data] = useFetchData();
  //console.log(roomData);
  console.log("Current user data:", data);
  if (data) {
    localStorage.setItem("id", data.id);
  }
  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (!socket) {
      return;
    }

    const roomID = localStorage.getItem("roomID");
    console.log(roomID);
    //console.log("Room ID from localStorage:", roomID);

    // Initial request for room data
    socket.emit("getRoomData", { roomId: roomID });

    // Listen for updated room data
    socket.on("roomData", (data) => {
      console.log("haaa",data.roomData)
      useRoomStore.getState().setRoomData(data.roomData);
    });

    // Listen for someone joining the room
    socket.on("roomJoined", (newRoomData) => {
      //console.log("New player joined the room:", newRoomData);
      useRoomStore.getState().setRoomData(newRoomData);
    });

    // Listen for a join message
    socket.on("roomMessage", (messageData) => {
      toast.success(messageData.msg);
    });

    // Listen for game start
    socket.on("gameStarted", (data) => {
      console.log(data.room);
      navigate(`/room/${data?.room?.roomID}`);
      useRoomStore.getState().setRoomData(data.room);
    });

    // Clean up listeners
    return () => {
      socket.off("roomData");
      socket.off("roomJoined");
      socket.off("roomMessage");
      socket.off("gameStarted");
    };
  }, [socket, navigate]);

  if (!socket) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg">Connecting to server...</span>
        </div>
      </div>
    );
  }

  const copyRoomId = () => {
    if (roomData?.roomID) {
      navigator.clipboard.writeText(roomData.roomID);
    }
  };

  const startGame = () => {
    if (!socket || !roomData?.roomID) return;

    setIsStarting(true);
    socket.emit("startGame", { roomId: roomData.roomID, token });
  };

  // Check if current user is the room owner
  const currentUserId = data?.id; // Assuming you store userId in localStorage
  const isRoomOwner = currentUserId === roomData?.creator?.id;

  // Check if both players are present
  const bothPlayersPresent = roomData?.players?.length === 2;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0C0D0D] p-4 font-press">
      <div className="h-[500px] w-[1000px] bg-[#1D1D1D] border-2 border-[#7024dc] rounded-2xl  flex  items-center justify-between gap-8 ">
        {/* Left player - creator */}
        <div className="flex flex-col items-center gap-4 flex-1 h-full justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#7024dc]">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center gap-2">
              <img
                src="https://img.icons8.com/color-pixels/2x/smurf.png"
                alt="creator"
                className="h-[24px]"
              />
              <p className="text-white font-medium text-sm m-0">
                {roomData?.creator?.name}
              </p>
            </div>
            <div className="flex justify-center items-center gap-1 text-slate-400 text-sm mt-2">
              <img
                src="https://img.icons8.com/color-pixels/2x/star.png"
                alt="elo"
                className="h-[24px]"
              />
              <span>{roomData?.creator?.elo || "Loading..."}</span>
            </div>
          </div>
        </div>

        {/* VS section */}
        <div className="flex flex-col items-center gap-6 flex-1 max-w-sm">
          <div className="text-center">
            <div className="text-5xl font-bold text-white  mb-2">
              VS
            </div>
            
          </div>

          {/* Game details */}
          <div className="bg-slate-[#1D1D1D] h-[150px] w-[410px] px-4 py-2 rounded-xl  border-2 border-[#7024dc] flex justify-center  ">
            <div className="grid grid-cols-2 gap-9 text-[10px]">
              <div className="flex items-center gap-2 text-slate-300 h-full w-full">
              <img src="https://img.icons8.com/color-pixels/2x/open-book.png" alt="" className="h-[15px]" />
                <span className="text-white">Topic:</span>
                <span className="text-red-600 font-medium">
                  {roomData?.topic}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                 <img src="https://img.icons8.com/color-pixels/2x/home.png" alt="" className="h-[15px]" />
                <span className="text-white">Room:</span>
                <span className="text-blue-300 font-medium">
                  {roomData?.roomType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <img src="https://img.icons8.com/color-pixels/2x/vertical-settings-mixer.png" alt="" className="h-[15px]" />
                <span className="text-white">Level:</span>
                <span className="text-[#7024dc] font-medium">
                  {roomData?.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <img src="https://img.icons8.com/color-pixels/2x/hourglass.png" alt="" className="h-[15px]" />
                <span className="text-white">Time:</span>
                <span className="text-green-500 font-medium">
                  {roomData?.questions?.estimatedTime || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Room ID */}
          <div className="w-full">
            <div
             className="flex justify-center items-center gap-1 text-xs">
              <h3 className="text-white text-sm m-0">Room ID:</h3>
              <p className=" text-white m-0">{roomData?.roomID}</p>
              <button 
                onClick={copyRoomId}
                className="ml-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                <img src="https://img.icons8.com/color-pixels/2x/copy.png" alt="" className="h-[20px]" />
              </button>
            </div>
          </div>

          {/* Start Game Button / Game Starting Message */}
          {bothPlayersPresent && (
            <div className="w-full mt-2">
              {isRoomOwner ? (
                <button
                style={{
                  background: '#4B0F9F',
                  background: 'linear-gradient(90deg, rgba(75, 15, 159, 1) 53%, rgba(112, 36, 220, 1) 100%)'
                }}
                  onClick={startGame}
                  disabled={isStarting}
                  className="w-full  text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isStarting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Starting Game...
                    </>
                  ) : (
                    <>
                      <img src="https://img.icons8.com/color-pixels/2x/next.png" alt="" className="h-[25px]"/>
                      Start Game
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full bg-[#1D1D1D] border-2 border-[#7024dc] rounded-lg px-2 py-3 text-center text-sm">
                  <div className="flex items-center justify-center gap-2 text-amber-400">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">Game starting soon..</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">
                    Waiting for host to start
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right player - joiner */}
        <div className="flex flex-col items-center gap-4 flex-1 h-full justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#7024dc]">
              {roomData?.joiner?.name ? (
                <Users className="w-10 h-10 text-slate-400" />
              ) : (
                <div className="w-10 h-10 border-2 border-slate-500 border-dashed rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-500" />
                </div>
              )}
            </div>
            {roomData?.joiner?.name && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
            {!roomData?.joiner?.name && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 text-sm text-white">
              {roomData?.joiner?.name ? (
                <>
                <img
                src="https://img.icons8.com/color-pixels/2x/sonic-the-hedgehog-1.png"
                alt="joiner"
                className="h-[24px]"
              />
                <p className="text-white font-medium text-sm m-0">
                  {roomData.joiner.name}
                </p>
                </>
              ) : (
                <span className="text-white flex items-center text-sm gap-1">
                  Waiting for player...
                </span>
              )
            }
            </div>
            {roomData?.joiner?.elo && (
              <div className="flex justify-center items-center gap-1 text-slate-400 text-sm mt-2">
                <img
                  src="https://img.icons8.com/color-pixels/2x/star.png"
                  alt="elo"
                  className="h-[24px]"
                />
                <span>{roomData.joiner.elo}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
 