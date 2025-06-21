import React from "react";
import Navbar from "../ui/Navbar";
import useFetchData from "../hooks/fetchdata";

const Profile = () => {
  // Fetch user data using the same hook as in Waiting.jsx
  const [userData] = useFetchData();
  
  // Store user ID in localStorage just like in Waiting component
  if (userData) {
    localStorage.setItem("id", userData.id);
  }
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0C0D0D] font-press overflow-y-auto">
      {/* navbar */}
      <div className="w-full flex justify-center mb-8">
        <Navbar />
      </div>
      {/* profile content */}
      <div className="w-full flex items-center justify-center px-16 mb-8 mt-[100px]">
        <div className="w-[90%] h-[290px] bg-[#1D1D1D] relative mt-[80px] rounded-[44px] flex">
          {/* profile circle */}
          <div className="h-full w-[30%]">
            <div className="absolute -top-20 left-10">
              <div className="h-[200px] w-[200px] bg-gray-300 rounded-full border-[4px] border-black shadow-[0_0_30px_10px_rgba(164,66,255,0.9)]"></div>
            </div>

            <div className="text-white flex flex-col h-full justify-end w-[280px] items-center pb-5 gap-2">
              <h1 className="text-lg font-bold">{userData?.name || "Username"}</h1>
              <div className="flex gap-4">
                <span className="flex items-center">
                  <img
                    src="https://img.icons8.com/color-pixels/2x/star.png"
                    alt=""
                    className="h-[35px]"
                  />
                  {userData?.elo || "1000"}
                </span>
                <span className="flex items-center">
                  <img
                    src="https://img.icons8.com/color-pixels/2x/gold-bars.png"
                    alt=""
                    className="h-[35px]"
                  />
                  {userData?.tier || "Gold"}
                </span>
              </div>
            </div>
          </div>

          <div className="h-full w-[70%] flex items-center">
            <div className="w-full h-[200px] border-l-4 border-[#7024dc] flex">
              <div className="progessbar h-full w-[40%] flex flex-col justify-center px-4 ">
                <div className="relative w-full h-4 bg-[#2A2A2A] rounded-full overflow-hidden">
                  {/* Progress Bar */}
                  <div
                    className="absolute h-full bg-gradient-to-r from-[#7024dc] to-[#a442ff] rounded-full"
                    style={{ width: `${userData?.progress || 65}%` }}
                  ></div>
                </div>

                {/* Current Level */}
                <div className="flex items-center mt-3">
                  <div className="ml-2">
                    <p className="text-white text-sm flex items-center gap-2">
                      Current:{" "}
                      <span className="text-[#FFD700] font-bold">{userData?.tier || "Gold"}</span>
                      <img
                        src="https://img.icons8.com/color-pixels/2x/gold-bars.png"
                        alt="Current Tier"
                        className="h-[35px]"
                      />
                    </p>
                    <p className="text-white text-xs">
                      {userData?.xpToNextTier || "650/1000"} XP to {userData?.nextTier || "Platinum"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="history h-full w-[60%]">
                <div className="h-full flex flex-col justify-center text-white p-4">
                  <h2 className="text-lg font-bold mb-4 ">Games History</h2>
                  <div className="w-full grid grid-cols-3 gap-4">
                    {/* Total Played */}
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xs mb-2">Games</p>
                      <div className="bg-[#2A2A2A] h-10 w-10 rounded-full flex items-center justify-center  border-2 border-white">
                        <span className="text-xs font-bold">{userData?.gamesPlayed || "42"}</span>
                      </div>
                    </div>

                    {/* Total Wins */}
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xs mb-2">Wins</p>
                      <div className="bg-[#2A2A2A] h-10 w-10 rounded-full flex items-center justify-center  border-2 border-green-500">
                        <span className="text-xs font-bold text-green-500">
                          {userData?.gamesWon || "28"}
                        </span>
                      </div>
                    </div>

                    {/* Total Losses */}
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xs mb-2">Loose</p>
                      <div className="bg-[#2A2A2A] h-10 w-10 rounded-full flex items-center justify-center border-2 border-red-500">
                        <span className="text-xs font-bold text-red-500">
                          {userData?.gamesLost || "14"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* leaderboard */}
      <div className="w-full flex flex-col items-center pb-8">
        <div className="w-[80%] mb-4">
          <h1 className="text-lg text-white">Leaderboard&emsp;&gt;</h1>
        </div>
        <div className="w-[70%] max-h-[300px] overflow-y-auto rounded-[20px] border-2 border-[#7024dc] px-[30px] py-[20px] flex flex-col gap-3">
          {/* leaderborad details */}
          <div className="h-[50px] w-[90%] flex justify-around items-center">
            <div className="">
              <img
                src="https://i.ibb.co/8LJX8FBN/image.png"
                alt=""
                className="h-[40px]"
              />
            </div>
            <div className="bg-white h-[40px] w-[40px] rounded-full">
              <img src="" alt="" />
            </div>
            <div className="h-full w-[80%] bg-[#1D1D1D] flex text-xs text-white items-center justify-around rounded-[15px]">
              <div>
                <p className="m-0">Player Name</p>
              </div>
              <div className="flex items-center">
                <img src="https://img.icons8.com/color-pixels/2x/gold-bars.png" alt="" className="h-[30px]"/>
                <p className="m-0">Gold</p>
              </div>
              <div className="flex items-center">
                <img src="https://img.icons8.com/color-pixels/2x/star.png" alt="" className="h-[30px]"/>
                <p className="m-0">1000</p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default Profile;
