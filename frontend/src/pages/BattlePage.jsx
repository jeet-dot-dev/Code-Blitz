import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";
import useRoomStore from "../store/roomStore";
import { toast } from "sonner";
import Header from "../components/Header";
import QuestionSection from "../components/QuestionScetion";
import EditorComp from "../components/Editor";

const BattlePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const roomData = useRoomStore((state) => state.roomData);
  const [compileCode, setCompileCode] = useState("");
  //console.log("BattlePage roomData:", roomData);

  useEffect(() => {
    if (!socket || !roomId) {
      // Either socket not ready or roomId not available yet
      console.log("Waiting for socket or roomId to be ready...", {
        socket,
        roomId,
      });
      return;
    }

    console.log("Emitting getRoomData for room:", roomId);

    const handleRoomData = (data) => {
      useRoomStore.getState().setRoomData(data.roomData);
    };

    const handleResultMsg = (data) => {
      navigate("/result");
      toast.success(data.msg);
    };

    // If socket is connected, emit directly
    if (socket.connected) {
      socket.emit("getRoomData", { roomId });
    } else {
      // Wait for socket to connect
      socket.once("connect", () => {
        socket.emit("getRoomData", { roomId });
      });
    }

    // Set up listeners
    socket.on("roomData", handleRoomData);
    socket.on("resultmsg", handleResultMsg);

    // Cleanup
    return () => {
      socket.off("roomData", handleRoomData);
      socket.off("resultmsg", handleResultMsg);
      socket.off("connect");
    };
  }, [socket, roomId, navigate]);

   console.log(roomData);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full grid grid-rows-12 overflow-hidden">
      <div className="header row-span-1 bg-black">
        <Header room={roomData} />
      </div>
      <div className="main row-span-11 grid grid-cols-12 overflow-hidden">
        <div className="question-palte col-span-4 bg-amber-300 overflow-y-auto">
          <QuestionSection
            questions={roomData?.questions}
            topic={roomData?.topic}
          />
        </div>
        <div className="editor col-span-8 grid grid-rows-12 overflow-hidden">
          <div className="monaco-editor row-span-8 overflow-hidden">
            <EditorComp setCompileCode={setCompileCode} room={roomData} />
          </div>
          <div className="compiler row-span-4 bg-[#0F0F0F] text-white p-4 overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {compileCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
