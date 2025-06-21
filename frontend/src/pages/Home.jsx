import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
        <Navbar/>
      <div className='flex flex-col  h-screen w-full bg-[#000] font-press overflow-hidden'>
        {/* Cursor Aura */}
        <div
         className="cursor pointer-events-none fixed top-0 left-0 h-[800px] w-[800px] rounded-full mix-blend-difference opacity-50 "

        />

        {/* Navbar */}
        <div className="w-full flex justify-center mb-32">
        </div>

        {/* Main Content */}
        <div className='flex flex-col items-center h-full gap-5'>
          <h1  className='text-2xl font-bold text-center mt-16 text-white flex justify-center items-center gap-4'>
            Welcome Player to the Battle Arena
          </h1>

          <p className='text-center mt-4 text-white'>
          Join or create a room to start battling with other players.
          </p>

          <div className='fixed bottom-[200px] left-1/2 -translate-x-1/2 z-50'>
              <button 
                className='bg-[#000] text-white text-xs px-3 py-3 rounded-[20px]'
              >
                Begin the battle
              </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home