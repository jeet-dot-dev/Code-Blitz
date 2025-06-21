// App.jsx
import { Route, Routes } from "react-router-dom";
import BattlePage from "./components/BattlePage";
import Home from "./components/Home";
import Auth from "./components/Auth";
import ProtectRoute from "./utils/ProtectRoute";
import RoomCreate from "./components/RoomCreate";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useState } from "react";
import { useEffect } from "react";
import Waiting from "./components/Waiting";
import ResWait from "./components/ResWait";
import Result from "./components/Result";
import { Toaster } from "sonner";
import Profile from "./components/Profile";

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
            <Profile/>
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
