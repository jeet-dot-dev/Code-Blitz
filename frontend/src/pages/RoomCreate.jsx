import { useEffect, useState, useRef, use } from "react"; // Add useRef import
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContex";
import { useContext } from "react";
import useRoomStore from "../store/roomStore";
import FloatingNavDemo from "../components/Navbar";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const RoomCreate = () => {
  // Add ref
  const createRef = useRef(null);
  const joinRef = useRef(null);
  const createBtnRef = useRef(null)
  // gsap animation
  useGSAP(()=>{
      // enterance animation
      gsap.from(createRef.current,{
        opacity:0,
        y:60,
        duration:0.8,
        ease:"power2.inOut",
      })
      gsap.from(joinRef.current,{
        opacity:0,
        y:60,
        duration:0.8,
        ease:"power2.inOut",
      })
      // breating animation
      gsap.fromTo(createRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 1,
        },
        {
          boxShadow: "#7024dc 0px 0px 60px",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power2.inOut",
        }
    )
    gsap.fromTo(joinRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 1,
        },
        {
          boxShadow: "#7024dc 0px 0px 60px",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power2.inOut",
        }
    )

    // hover effect 
    const handleCreateHover = () => {
      gsap.to(createRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const handleBreathingCreate = () =>{
      gsap.fromTo(createRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 0.5,
        },
        {
          boxShadow: "#7024dc 0px 0px 50px",
          repeat: -1,
          yoyo: true,
          duration: 0.6,
          ease: "power2.inOut",
        }
    )
  }
    const handleBreCreateLeave = () => {
      gsap.fromTo(createRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 1,
        },
        {
          boxShadow: "#7024dc 0px 0px 60px",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power2.inOut",
        }
    )
    }

    const handleCreateLeave = () => {
      gsap.to(createRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleJoinHover = () => {
      gsap.to(joinRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleBreathingJoin = () => {
      gsap.fromTo(joinRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 0.5,
        },
        {
          boxShadow: "#7024dc 0px 0px 50px",
          repeat: -1,
          yoyo: true,
          duration: 0.6,
          ease: "power2.inOut",
        }
      );
    };
    
    const handleBreJoinLeave = () => {
      gsap.fromTo(joinRef.current,
        {
          boxShadow:"#7024dc 0px 0px 0px",
          delay: 1,
        },
        {
          boxShadow: "#7024dc 0px 0px 60px",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power2.inOut",
        }
      );
    };

    const handleJoinLeave = () => {
      gsap.to(joinRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Button Hover
    const createButtonAnimation = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const overlay = document.createElement('div');
        overlay.className = 'gradient-overlay';
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(120, 40, 230, 0.9) 0%, rgba(160, 80, 255, 0.95) 100%);
          transition: none;
          border-radius: 8px;
          z-index: -1;
        `;
        
      
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.style.zIndex = '1';
        
        button.appendChild(overlay);
        
       
        button.addEventListener('mouseenter', () => {
          gsap.to(overlay, {
            left: '0%',
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(overlay, {
            left: '-100%',
            duration: 0.4,
            ease: 'power2.in'
          });
        });
      });
    };
    
    setTimeout(createButtonAnimation, 500);

    createRef.current?.addEventListener('mouseenter', handleCreateHover);
    // createRef.current?.addEventListener('mouseenter',handleBreathingCreate)
    // createRef.current?.addEventListener('mouseleave', handleBreCreateLeave);
    createRef.current?.addEventListener('mouseleave', handleCreateLeave);
    joinRef.current?.addEventListener('mouseenter', handleJoinHover);
    // joinRef.current?.addEventListener('mouseenter', handleBreathingJoin);
    // joinRef.current?.addEventListener('mouseleave', handleBreJoinLeave);
    joinRef.current?.addEventListener('mouseleave', handleJoinLeave);

  },[])




  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const setRoomData = useRoomStore((state) => state.setRoomData);
  const [formData, setFormData] = useState({
    topic: "",
    roomType: "",
    difficulty: "",
    roomId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleRoomCreated = (data) => {
      //console.log("Room created:", data);
      setRoomData(data);
      //console.log(data?.roomData?.roomID);
      localStorage.setItem("roomID", data?.roomData?.roomID);
      navigate(`/room/waiting`);
    };

    const handleJoinRoom = (data) => {
      //console.log("Joined room:", data);
      localStorage.setItem("roomID", data.roomID);

      navigate(`/room/waiting`);
    };

    socket.on("roomCreated", handleRoomCreated);
    socket.on("roomJoined", handleJoinRoom);
    socket.on("error", (err) => {
      console.error("Socket error:", err);
      setError(err.message || "An error occurred. Please try again.");
    });

    return () => {
      socket.off("roomCreated", handleRoomCreated);
      socket.off("roomJoined", handleJoinRoom);
      socket.off("error");
    };
  }, [socket, navigate, setRoomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createRoom = () => {
    const { topic, roomType, difficulty } = formData;
    const token = localStorage.getItem("Token");

    if (!token) {
      setError("You must be logged in to create a room");
      return;
    }

    if (!topic || !roomType || !difficulty) {
      setError("Please fill all fields");
      return;
    }

    if (!socket) {
      setError("Connection not established. Please try again.");
      return;
    }

    setError("");
    setIsLoading(true);
    socket.emit("createRoom", { topic, roomType, difficulty, token });
  };

  const joinRoom = () => {
    const { roomId } = formData;
    const token = localStorage.getItem("Token");

    if (!token) {
      setError("You must be logged in to create a room");
      return;
    }
    if (!roomId) {
      setError("Please enter a room ID");
      return;
    }

    if (!socket) {
      setError("Connection not established. Please try again.");
      return;
    }

    setError("");
    setIsLoading(true);
    socket.emit("joinRoom", { roomId, token });
  };



  return (
    <div className="font-press min-h-screen bg-[#000] text-white">
      {/* Cursor Aura - Lowered z-index so it doesn't appear over room boxes */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-32" >
          <FloatingNavDemo/>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto flex mb-6 bg-red-600 border border-red-500 rounded-lg p-4">
            <p>{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-2 text-red-200 hover:text-white"
            >
              ×
            </button>
          </div>
        )}

        <div className="w-full flex justify-center items-center gap-[166px] relative z-10">
          {/* Create Room */}
          
          <div ref={createRef} className="bg-[#060606] rounded-xl p-8  h-[420px] w-[410px] flex flex-col">
            <h2 className="text-[18px] font-bold mb-6 text-white flex items-center gap-3">
              <img className="w-10" src="https://i.ibb.co/rGTWwYLW/image.png" alt="img" />
              Create a Room
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="topic"
                placeholder="Topic (e.g., Arrays)"
                value={formData.topic}
                onChange={handleChange}
                className=" w-full bg-[#212323] outline-none border-none rounded-lg px-4 py-3 text-white placeholder:text-sm placeholder-gray-400"
                disabled={isLoading}
              />

              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full bg-[#212323] outline-none border-none rounded-lg px-4 py-3 text-white placeholder:text-sm placeholder-gray-400"
                disabled={isLoading}
              >
               <option value={"private"}>Private</option>
                <option value={"public"}>Public</option>
              </select>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-[#212323] outline-none border-none rounded-lg px-4 py-3 text-white placeholder:text-sm placeholder-gray-400"
                disabled={isLoading}
              >
                <option value="">Select difficulty</option>
                {["easy", "medium", "hard"].map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>

              <button 
                ref={createBtnRef}
                style={{
                  background: '#4B0F9F',
                  background: 'linear-gradient(90deg, rgba(75, 15, 159, 1) 53%, rgba(112, 36, 220, 1) 100%)'
                }}
                onClick={createRoom}
                disabled={isLoading}
                className="w-full  py-3 rounded-lg font-bold transition-all"
              >
                {isLoading ? "Creating Room..." : "Create Room"}
              </button>
            </div>
          </div>

          {/* Join Room */}
          <div ref={joinRef} className="bg-[#060606]  rounded-xl p-8  h-[420px] w-[410px] flex flex-col">
            <h2 className="text-[18px] font-bold mb-6 text-white flex items-center gap-3">
              <img className="w-10" src="https://i.ibb.co/23WqFw8W/image.png" alt="img" />
              Join a Room
            </h2>

            <input
              type="text"
              name="roomId"
              placeholder="Enter 6-character room ID"
              value={formData.roomId}
              onChange={handleChange}
              maxLength={6}
              className="w-full bg-[#212323] outline-none border-none rounded-lg px-4 py-3 text-white placeholder:text-sm placeholder-gray-400"
              disabled={isLoading}
            />

            <button
              style={{
                  background: '#4B0F9F',
                  background: 'linear-gradient(90deg, rgba(75, 15, 159, 1) 53%, rgba(112, 36, 220, 1) 100%)'
                }}

              onClick={joinRoom}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold transition-all"
            >
              {isLoading ? "Joining Room..." : "Join Room"}
            </button>

            <div className="text-xm mt-8 w-full bg-[#212323] outline-none border-none rounded-lg px-4 py-3 text-white placeholder:text-sm placeholder-gray-400">
              <h3 className="text-[15px] text-center">Join Random Room</h3>
              <button
              style={{
                  background: '#4B0F9F',
                  background: 'linear-gradient(90deg, rgba(75, 15, 159, 1) 53%, rgba(112, 36, 220, 1) 100%)'
                }}
              onClick={joinRoom}
              disabled={isLoading}
              className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg font-bold transition-all"
            >
              {isLoading ? "Joining Room..." : "Join Room"}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCreate;
