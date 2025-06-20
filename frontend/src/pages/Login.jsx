
import { useState} from "react";
import "../App.css"; 

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
 
  // onChange handler 

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#0C0D0D] font-press text-xs">
      <div className="w-[401px] h-[486px]  border-2 border-[#7024dc] max-w-md space-y-8 rounded-[16px] flex flex-col justify-center">
        <div>
          <h1 className=" text-white text-xs font-bold text-center mb-4">
           Create an account
          </h1>
          <p className="text-white text-center mb-2 text-xs">
           Already have an account
          </p>
        </div>
        <div className="space-y-8 flex flex-col items-center">
         
            <div>
              <div className="bg-transparent w-[308px] px-2 py-2 borde rounded-md focus:outline-none flex border-2 border-[#7024dc]">
                <img src="https://img.icons8.com/color-pixels/2x/test-account.png" alt=""  className="h-[35px]"/>
                <input
                id="name"
                type="text"
                placeholder="Enter your username"
                className="w-full px-1 py-2  outline-none bg-transparent text-white"/>
              </div>
            </div>
        
            <div>
              <div className="bg-transparent w-[308px] px-2 py-2 borde rounded-md focus:outline-none flex border-2 border-[#7024dc]">
                <img src="https://img.icons8.com/color-pixels/2x/user.png" alt=""  className="h-[35px]"/>
                <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-1 py-2  outline-none bg-transparent text-white"/>
              </div>
            </div>

          <div>
              <div className="bg-transparent w-[308px] px-2 py-2 borde rounded-md focus:outline-none flex border-2 border-[#7024dc]">
                <img src="https://img.icons8.com/color-pixels/2x/password.png" alt=""  className="h-[35px]"/>
                <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-1 py-2  outline-none bg-transparent text-white"/>
              </div>
            </div>
          <button
            type="submit"
            className="loginbutton w-[132px] h-[46px]  py-2 px-4 bg-[#18181a] cursor-pointer text-white  hover:bg-black transition-colors"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;