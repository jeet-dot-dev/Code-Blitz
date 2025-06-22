 import { useEffect, useState } from "react";
 import useRoomStore from "../store/roomStore";
// import { SocketContext } from "../SocketContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

const GameTimer = ({ handleautoSubmit }) => {
  const roomData = useRoomStore((state) => state.roomData);
console.log("🔥 Room Data:", roomData);
const estimatedTime = roomData?.questions?.estimatedTime
  const [timeleft, setTimeleft] = useState(estimatedTime * 60);
//   const socket = useContext(SocketContext);
//   const navigate = useNavigate();



  useEffect(() => {
    if (!estimatedTime) return;
  //  console.log(estimatedTime);
    const interval = setInterval(() => {
      setTimeleft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleautoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [estimatedTime, handleautoSubmit]);

  const formatTime = () => {
    const minutes = Math.floor(timeleft / 60);
    const sec = timeleft % 60;
    return `${minutes.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };
console.log(formatTime)
  return (
    <div className="text-2xl font-bold text-white">
      Time Left: {formatTime()}
    </div>
  );
};

export default GameTimer;
