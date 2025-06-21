import React, { useContext, useEffect, useState } from "react";
import useRoomStore from "../store/roomStore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../SocketContext";
import EditorComp from "../ui/Editor";
import QuestionSection from "../ui/QuestionSection";
import Header from "../ui/Header";
import { toast } from "sonner";

const BattlePage = () => {
  const { roomId } = useParams();
   const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const roomData = useRoomStore((state) => state.roomData);
  const [compileCode, setCompileCode] = useState("");
  //console.log("BattlePage roomData:", roomData);

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
    if (!roomId) {
      console.error("Room ID is not provided");
      return;
    }
    socket.emit("getRoomData", { roomId });
    socket.on("roomData", (data) => {
      useRoomStore.getState().setRoomData(data.roomData);
    });
    socket.on("resultmsg",(data)=>{
      navigate('/result');
      toast.success(data.msg);
    })
    return () => {
      socket.off("roomData");
      socket.off("resultmsg");
    };
  }, [socket, roomId,navigate]);

  // console.log(roomData);

  return (
    <div className="h-screen w-full grid grid-rows-12 overflow-hidden">
      <div className="header row-span-1 bg-black">
        <Header room={roomData}/>
      </div>
      <div className="main row-span-11 grid grid-cols-12 overflow-hidden">
        <div className="question-palte col-span-4 bg-amber-300 overflow-y-auto">
          <QuestionSection questions={roomData?.questions} topic={roomData?.topic} />
        </div>
        <div className="editor col-span-8 grid grid-rows-12 overflow-hidden">
          <div className="monaco-editor row-span-8 overflow-hidden">
            <EditorComp setCompileCode={setCompileCode} room={roomData} />
          </div>
          <div className="compiler row-span-4 bg-[#0F0F0F] text-white p-4 overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">{compileCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
