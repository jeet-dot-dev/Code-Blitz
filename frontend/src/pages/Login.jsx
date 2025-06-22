import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "sonner";
import { gsap } from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

const Login = () => {
  const pathRef = useRef(null);
  gsap.registerPlugin(DrawSVGPlugin);
useGSAP(() => {

   gsap.fromTo(pathRef.current,
        {
          boxShadow:"#7024dc 0px 0px 10px",
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


  
}, []);


  const [isSignup, setIsSignup] = useState(true);
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        const res = await axios.post(`${url}/api/v1/signup`, data);
        const jwt = res.data.token;
        localStorage.setItem("Token", jwt);
        localStorage.setItem("isAuth", true);
        toast.success("welcome to codeblits");
        navigate("/createroom");
      } else {
        const { email, password } = data;
        const res = await axios.post(`${url}/api/v1/login`, {
          email,
          password,
        });
        const jwt = res.data.token;
        localStorage.setItem("Token", jwt);
        localStorage.setItem("isAuth", true);
        toast.success("welcome back to codeblits");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#0C0D0D] font-press text-xs relative">

      <div ref={pathRef} className=" w-[401px] h-[486px] space-y-8 rounded-[16px] flex flex-col justify-center relative z-10 border-2 border-[#7024dc]">
        <div>
          <h1 className="text-white text-xs font-bold text-center mb-4">
            {isSignup ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-white text-center mb-2 text-xs">
            {isSignup ? "Already have an account?" : "Don't have an account? "}
            <Link
              to={isSignup ? "/login" : "/signup"}
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(!isSignup);
              }}
              className="text-[#7024dc] hover:text-[#a06bff] transition-colors duration-300"
            >
              {isSignup ? "Login" : "Sign up"}
            </Link>
          </p>
        </div>

        <div className="space-y-8 flex flex-col items-center">
          {isSignup && (
            <InputField
              id="name"
              value={data.name}
              onChange={handleChange}
              icon="https://img.icons8.com/color-pixels/2x/test-account.png"
              placeholder="Enter your name"
            />
          )}
          <InputField
            id="email"
            value={data.email}
            onChange={handleChange}
            icon="https://img.icons8.com/color-pixels/2x/user.png"
            placeholder="Enter your email"
            type="email"
          />
          <InputField
            id="password"
            value={data.password}
            onChange={handleChange}
            icon="https://img.icons8.com/color-pixels/2x/password.png"
            placeholder="Enter your password"
            type="password"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="loginbutton hover:bg-[#9244ff] w-[132px] h-[46px] py-2 px-4 bg-[#18181a] cursor-pointer text-white transition-colors duration-300 rounded-md"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔧 Reusable InputField Component
const InputField = ({ id, value, onChange, placeholder, icon, type = "text" }) => (
  <div className="bg-transparent w-[308px] px-2 py-2 border-2 border-[#7024dc] rounded-md focus:outline-none flex">
    <img src={icon} alt="" className="h-[35px]" />
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-1 py-2 outline-none bg-transparent text-white"
    />
  </div>
);

export default Login;
