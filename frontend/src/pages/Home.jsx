import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from 'react';
import useFetchData from '../hooks/fetchdata';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import LoadingAnimation from '../components/LoadingAnimation';

gsap.registerPlugin(ScrambleTextPlugin);


const Home = () => {

  const btnRef = useRef();
  const textOneRef= useRef()
  const textTwoRef= useRef()
  const [userData] = useFetchData();
  const navigate = useNavigate();
  const cursorRef = useRef();

  useGSAP(() => {
  // cursor animation
  const moveCursor = (e) => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      delay: 0.5,
      duration: 5,
      ease: "power2.out"
    });
  };

  // timeline animations
  let tl = gsap.timeline();

    tl.to('path',{
      drawSVG: "100%",
        duration: 1.5,
        stagger: 0.3,
        ease: "power1.inOut"
    })
    .to('path', {
      fill: "7932DD",
      duration: 0.5,
      delay: 0.2
    })
    .to('.con', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        gsap.set('.wrapper', { display: 'none' });
      }
    })
    .to(textOneRef.current, {
      scrambleText: {
        text: `Welcome ${userData?.name || 'Player'} to the Battle Arena!`,
        chars: "upperAndLowerCase",
        speed: 0.5,
        revealDelay: 0.1,
      },
      duration: 2,
      delay: 0.2,
      ease: "none",
    })
    .to(textTwoRef.current, {
      scrambleText: {
        text: "Join or create a room to start battling!",
        chars: "upperAndLowerCase",
        speed: 0.5,
        revealDelay: 0.1,
      },
      duration: 2,
      ease: "none",
    }, "-=1.8")
    .from(btnRef.current, {
      scale: 0,
      y: 60,
      duration: 0.5,
      ease: "back.out(1.7)",
      transformOrigin: "center center",
      clearProps: "transform",
    })
    // Replace the fromTo with a to animation that properly alternates with yoyo
    .fromTo(btnRef.current,{
      boxShadow: "0px 0px 0px rgba(112, 36, 220, 0.7)",
    }, {
      boxShadow: "0px 0px 30px rgba(112, 36, 220, 0.7)", 
      duration: 1,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
      ease: "power1.inOut",
      
    });
    // btn hover
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

  window.addEventListener('mousemove', moveCursor);
  return () => window.removeEventListener('mousemove', moveCursor);
}, []);

  
  return (
   <>
    <LoadingAnimation/>
      <div className='flex flex-col  h-screen w-full bg-[#000] font-press overflow-hidden'>
        {/* Cursor Aura */}
        <div
          ref={cursorRef}
         className="cursor pointer-events-none fixed top-0 left-0 h-[800px] w-[800px] rounded-full mix-blend-difference opacity-50 "

        />

        {/* Navbar */}
        <div className="w-full flex justify-center mb-32">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className='flex flex-col items-center h-full gap-5'>
          <h1  className='text-2xl font-bold text-center mt-16 text-white flex justify-center items-center gap-4' ref={textOneRef}>
          
          </h1>

          <p className='text-center mt-4 text-white' ref={textTwoRef}>
          
          </p>

          <div className='fixed bottom-[200px] left-1/2 -translate-x-1/2 z-50'>
              <button ref={btnRef}
                className='bg-[#000] text-white text-xs px-3 py-3 rounded-[20px]'
                onClick={() => navigate('/createroom')}
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