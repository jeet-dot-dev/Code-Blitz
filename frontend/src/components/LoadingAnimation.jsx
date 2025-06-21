import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

const LoadingAnimation = () => {
  gsap.registerPlugin(DrawSVGPlugin)
  
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  
  useGSAP(() => {
    // Select all path elements within the SVG
    const paths = svgRef.current.querySelectorAll('path');
    
    // Create a timeline for the animation
    const tl = gsap.timeline();
    
    // Set initial state - all paths with drawSVG: "0%"
    gsap.set(paths, { drawSVG: "0%" });
    
    // Animate each path
    tl.to(paths, {
      drawSVG: "100%",
      duration: 1.5,
      stagger: 0.3,
      ease: "power1.inOut"
    })
    .to(paths, {
      fill: "#7932DD",
      duration: 0.5,
      delay: 0.2
    })
    // Add pulsating glow effect
    .to(glowRef.current, 
      { 
        opacity: 0.7, 
        filter: "blur(20px)", 
        duration: 0.1, 
      }
    )
    // Add subtle rotation to the SVG
    .to(svgRef.current, {
      filter: "drop-shadow(0 0 15px rgba(121, 50, 221, 0.8))",
      duration: 2,
      ease: "power1.inOut"
    }, "-=1.5");
    
  }, []);
  
  return (
   <div className='con wrapper absolute top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center flex-col'>
      {/* Glow effect */}
      <div 
        ref={glowRef} 
        className="absolute w-[400px] h-[400px] rounded-full bg-[#7932DD] opacity-0"
        style={{ 
          filter: "blur(20px)", 
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%"
        }}
      ></div>
      
      <svg ref={svgRef} width="345" height="217" viewBox="0 0 345 217" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path d="M263.127 22.1214C265.117 22.1989 267.069 22.207 269.059 22.1214H296.857V161.471C292.072 164.291 280.05 171.848 276.396 175.392C272.591 173.309 268.971 170.395 265.369 168.011L238.89 150.441C232.821 146.427 226.768 142.399 220.599 138.51L170.734 106.628C163.008 101.957 155.748 96.7168 148 92.0529V54.1799L253.138 121.938C256.473 124.077 259.906 126.126 263.127 128.403V22.1214Z" stroke="#7932DD" strokeWidth="2" fill="transparent"/>
        <path d="M49 151.549V42C52.1861 43.2713 55.1528 45.6271 57.9566 47.4735L155.973 111.114C164.327 116.592 172.817 121.919 181.132 127.437C185.752 130.502 192.28 135.389 197.084 137.755C197.087 150.306 196.852 162.893 197.084 175.44C192.381 173.2 188.177 169.851 183.841 167.072L150.018 145.131C127.389 130.2 104.892 115.062 81.9203 100.56V172.683C77.243 170.72 68.8757 164.358 64.5181 161.46C59.4179 158.066 54.094 154.953 49 151.549Z" stroke="#7932DD" strokeWidth="2" fill="transparent"/>
      </svg>
      
    </div>
  )
}

export default LoadingAnimation