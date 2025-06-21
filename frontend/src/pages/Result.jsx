import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContex";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResWait = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("resultmsg", (data) => {
      navigate("/result");
      toast.success(data.msg);
    });
    return ()=>{
      socket.off("resultmsg");
    }
  }, [socket, navigate]);
  return <div>Wait Until oponent submit their code ....</div>;
};

export default ResWait;
