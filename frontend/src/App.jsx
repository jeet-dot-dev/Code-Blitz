import { Route, Routes } from "react-router-dom";
import BattlePage from "./pages/BattlePage";
import Home from "./pages/Home";
import Auth from "./pages/Login";
import ProtectRoute from "./utils/ProtectRoute";
import RoomCreate from "./pages/RoomCreate";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useState, useEffect } from "react";
import Waiting from "./pages/Waiting";
import ResWait from "./pages/ResWait";
import Result from "./pages/Result";
import { Toaster } from "sonner";
import Profile from "./pages/Profile";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/createroom"
          element={
            <ProtectRoute>
              <RoomCreate />
            </ProtectRoute>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ProtectRoute>
              <BattlePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route
          path="/res/waiting"
          element={
            <ProtectRoute>
              <ResWait />
            </ProtectRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectRoute>
              <Result />
            </ProtectRoute>
          }
        />
        <Route
          path="/room/waiting"
          element={
            <ProtectRoute>
              <Waiting />
            </ProtectRoute>
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#ffffff",
            border: "1px solid #7024dc",
          },
        }}
        theme="dark"
      />
    </SocketContext.Provider>
  );
};

export default App;
