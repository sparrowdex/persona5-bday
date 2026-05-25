"use client";
import { useState, useEffect } from "react";

export default function BirthdayCard() {
  const [isOpened, setIsOpened] = useState(false);
  const [currentView, setCurrentView] = useState("message"); 
  const [startVideoTransition, setStartVideoTransition] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [transitionGrid, setTransitionGrid] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);

  // Touch handlers for mobile swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    setMounted(true);
    
    // THE SCREEN FLOOD LOGIC: CREATING A GUARANTEED GRID COVERAGE
    const rows = 10; 
    const cols = 10;
    const totalCells = rows * cols;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ★!#&";
    const styles = [
      "bg-white text-black font-black border-4 border-black",
      "bg-black text-white font-extrabold border-4 border-white",
      "bg-[#E60012] text-white font-black border-4 border-black",
      "bg-yellow-400 text-black font-mono font-black border-4 border-black",
    ];

    const generatedGrid = Array.from({ length: totalCells }).map((_, i) => ({
      char: alphabet[Math.floor(Math.random() * alphabet.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      rot: `${Math.floor(Math.random() * 40) - 20}deg`, 
      delay: `${Math.floor(Math.random() * 1200)}ms` 
    }));
    
    setTransitionGrid(generatedGrid);
  }, []);

  // COUNTDOWN LOGIC TO MAY 26, 2026
  useEffect(() => {
    // Target Date: May 26, 2026 at Midnight
    const targetDate = new Date("2026-05-26T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timeString = days > 0 
          ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        setTimeLeft(timeString);
        setShowCountdown(true);
      } else {
        setShowCountdown(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const messageText = "HAPPY BIRTHDAY DAWG";
  const words = messageText.split(" ");

  // HANDLE MOBILE SWIPING DETECTION
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; 
    
    if (isLeftSwipe) {
      if (currentView === "message") setCurrentView("check_stats");
      else if (currentView === "check_stats") setCurrentView("stats");
      else if (currentView === "stats" && !startVideoTransition) triggerVideoTransition();
    }
  };

  // Function to manually trigger the final transition when the user is ready
  const triggerVideoTransition = () => {
    setStartVideoTransition(true);
    
    setTimeout(() => {
      setShowVideo(true);
    }, 1300); // 1.3s delay matches the time it takes the screen flood to cover the view
  };

  const cutoutStyles = [
    "bg-white text-black font-black border-2 border-black tracking-tighter",
    "bg-black text-white font-extrabold border-2 border-white tracking-widest",
    "bg-[#E60012] text-white font-black uppercase border-2 border-black",
    "bg-white text-[#E60012] font-serif font-bold italic border-x-4 border-black",
    "bg-black text-yellow-400 font-mono font-black border-b-4 border-yellow-400",
  ];

  if (!mounted) return null;

  // The perfect mathematical 5-point star array
  const perfectStarPoints = "50,0 61,35 98,35 68,56 79,90 50,69 21,90 32,56 2,35 39,35";

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center overflow-hidden font-sans select-none relative">
      
      <style>{`
        @keyframes slap {
          0% { transform: scale(3) rotate(15deg); opacity: 0; }
          60% { transform: scale(0.9) rotate(-3deg); opacity: 1; }
          80% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes card-intro {
          0% { transform: perspective(1000px) rotateY(-180deg); opacity: 0; }
          100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-150%); opacity: 0; }
          80% { transform: translateX(10px); opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* BACKGROUND LAYER & GRADIENT TRANSITION */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 z-0 ${
          startVideoTransition 
            ? "bg-gradient-to-b from-[#0F0F0F] via-[#7A0006] to-[#0F0F0F] opacity-100" 
            : isOpened && (currentView === "message" || currentView === "check_stats")
              ? "bg-[#D31018]" 
              : "bg-[#0F0F0F]" // Background safely turns deep black again when currentView switches to "stats"!
        }`} 
      />

      {/* LOUD & CHAOTIC PERSONA BACKGROUND STARS (Safely Kept & Unmodified) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-[-40px] left-[-50px] text-white font-black text-[15rem] opacity-15 rotate-12">★</div>
        <div className="absolute top-[80px] left-[60px] text-black font-black text-8xl opacity-30 -rotate-12">★</div>
        <div className="absolute top-[220px] left-[-20px] text-white font-black text-7xl opacity-20 rotate-45">★</div>
        <div className="absolute top-[10%] right-[8%] text-black font-black text-[11rem] opacity-25 -rotate-6">★</div>
        <div className="absolute top-[22%] right-[18%] text-white font-black text-6xl opacity-15 rotate-12">★</div>
        <div className="absolute top-[5%] right-[25%] text-white font-black text-4xl opacity-10 rotate-45">★</div>
        <div className="absolute bottom-[-60px] left-[-20px] text-black font-black text-[13rem] opacity-30 -rotate-45">★</div>
        <div className="absolute bottom-[100px] left-[80px] text-white font-black text-7xl opacity-20 rotate-12">★</div>
        <div className="absolute bottom-[40px] left-[200px] text-black font-black text-5xl opacity-15 rotate-6">★</div>
        <div className="absolute bottom-[15%] right-[-30px] text-white font-black text-[14rem] opacity-15 rotate-45">★</div>
        <div className="absolute bottom-[28%] right-[90px] text-black font-black text-9xl opacity-35 -rotate-12">★</div>
        <div className="absolute bottom-[12%] right-[180px] text-white font-black text-6xl opacity-25 rotate-12">★</div>
        <div className="absolute top-[45%] left-[12%] text-white font-black text-5xl opacity-10 -rotate-12">★</div>
        <div className="absolute top-[38%] right-[10%] text-black font-black text-7xl opacity-15 rotate-45">★</div>
        <div className="absolute bottom-[45%] right-[22%] text-white font-black text-4xl opacity-10 -rotate-6">★</div>
      </div>

      {!isOpened ? (
        /* --- STAGE 1: THE LANDING PAGE --- */
        <div className="z-10 flex flex-col items-center text-center px-4">
          <p className="text-white text-lg tracking-widest uppercase mb-8 font-bold [text-shadow:_0_2px_10px_rgba(255,255,255,0.3)]">
            A calling card has been delivered to you.
          </p>
          
          <div style={{ animation: "card-intro 1s cubic-bezier(0.25, 1, 0.5, 1) both" }}>
            <button
              onClick={() => setIsOpened(true)}
              className="group relative w-64 h-40 bg-[#E60012] border-4 border-white transition-transform duration-300 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(230,0,18,0.6)] hover:shadow-[0_0_50px_rgba(230,0,18,0.9)] flex items-center justify-center -skew-x-12 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-25 pointer-events-none">
                <img 
                  src="/images/Joker_Mask.png" 
                  srcSet="/images/Joker_Mask.png 1x"
                  alt="Joker Mask" 
                  className="w-3/4 h-3/4 object-contain skew-x-12"
                />
              </div>

              <span className="absolute bottom-2 right-3 text-white text-xs tracking-widest font-mono opacity-50 z-10">
                READ ME
              </span>
            </button>
          </div>

          {showCountdown && (
            <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-64 md:w-80 z-20">
              <div className="relative w-full h-full flex items-center justify-center animate-pulse [animation-duration:3s]">
                <img 
                  src="/images/countdown.png" 
                  alt="Countdown" 
                  className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(230,0,18,0.5)]" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-mono font-black text-2xl md:text-2xl pb-15 pr-5 tracking-widest -skew-x-6 [text-shadow:_2px_2px_0px_#E60012]">
                    {timeLeft}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- STAGE 2: SWIPEABLE DUAL SECTION INTERFACE --- */
        <div 
          className="z-10 flex flex-col items-center justify-center max-w-4xl px-4 w-full text-center relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* VIEW A: THE TRADITIONAL CUTOUT RANSOM MESSAGE CARD */}
          {currentView === "message" && (
            <div className="flex items-center gap-6 md:gap-10 justify-center w-full max-w-4xl">
              <div className="flex flex-col items-center w-full max-w-2xl">
                <div className="animate-[slap_0.4s_ease-out_both] bg-black text-white p-8 md:p-12 border-4 border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] w-full mb-12 relative min-h-[200px] flex items-center justify-center -rotate-1">
                  <div className="flex flex-wrap justify-center gap-y-8 gap-x-4">
                    {words.map((word, wordIdx) => (
                      <div key={wordIdx} className="flex gap-1 md:gap-2 mx-2">
                        {word.split("").map((char, charIdx) => {
                          const globalIdx = messageText.slice(0, messageText.indexOf(word)).length + charIdx;
                          const styleClass = cutoutStyles[globalIdx % cutoutStyles.length];
                          
                          const startFromLeft = globalIdx % 2 === 0;
                          const randomXPx = startFromLeft ? `-${400 + (globalIdx * 20)}px` : `${400 + (globalIdx * 20)}px`;
                          const randomYPx = `${(globalIdx % 3 === 0 ? -200 : 200)}px`;
                          const randomRotation = `${(globalIdx % 2 === 0 ? 7 : -9)}deg`;

                          return (
                            <div
                              key={charIdx}
                              className="animate-assemble base-letter"
                              style={{
                                "--delay": `${300 + (globalIdx * 100)}ms`,
                                "--rand-rot": randomRotation,
                                "--rand-x": randomXPx,
                                "--rand-y": randomYPx,
                              }}
                            >
                              <div className={`w-10 h-12 md:w-14 md:h-16 flex items-center justify-center text-2xl md:text-4xl shadow-md transform transition-all duration-300 ${styleClass}`}>
                                {char}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div 
                  className="animate-signature-slide text-left self-center text-black font-black text-xl md:text-3xl tracking-wider bg-white px-6 py-2 border-2 border-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-start rotate-1"
                  style={{ 
                    animationDelay: `${300 + (messageText.replace(/\s/g, "").length * 100) + 150}ms`,
                    animationFillMode: 'both' 
                  }}
                >
                  <p className="text-xs font-mono tracking-widest text-gray-600 block">From:</p>
                  The Phantom Thieves <br />
                  <span className="text-[#E60012] text-2xl md:text-4xl block mt-1 tracking-tighter font-extrabold [text-shadow:_1px_1px_0_#000]">
                    TAKE YOUR HEART
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView("check_stats")}
                className="hidden md:block text-white hover:text-[#E60012] font-black text-5xl transition-colors duration-200 active:scale-90 select-none shrink-0 cursor-pointer"
                title="Next View"
              >
                ➔
              </button>
            </div>
          )}

          {/* VIEW A.5: INTERMEDIATE "CHECK YOUR SOCIAL STATS" MESSAGE */}
          {currentView === "check_stats" && (
            <div className="flex items-center gap-6 md:gap-10 justify-center w-full max-w-4xl">
              <div className="flex flex-col items-center w-full max-w-2xl">
                <div className="animate-[slap_0.4s_ease-out_both] bg-black text-white p-8 md:p-12 border-4 border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] w-full mb-12 relative min-h-[200px] flex items-center justify-center rotate-1">
                  <div className="flex flex-wrap justify-center gap-y-8 gap-x-4">
                    {"CHECK YOUR SOCIAL STATS".split(" ").map((word, wordIdx) => (
                      <div key={wordIdx} className="flex gap-1 md:gap-2 mx-2">
                        {word.split("").map((char, charIdx) => {
                          const checkText = "CHECK YOUR SOCIAL STATS";
                          const globalIdx = checkText.slice(0, checkText.indexOf(word)).length + charIdx;
                          const styleClass = cutoutStyles[globalIdx % cutoutStyles.length];
                          
                          const startFromLeft = globalIdx % 2 === 0;
                          const randomXPx = startFromLeft ? `-${400 + (globalIdx * 20)}px` : `${400 + (globalIdx * 20)}px`;
                          const randomYPx = `${(globalIdx % 3 === 0 ? -200 : 200)}px`;
                          const randomRotation = `${(globalIdx % 2 === 0 ? -7 : 9)}deg`;

                          return (
                            <div
                              key={charIdx}
                              className="animate-assemble base-letter"
                              style={{
                                "--delay": `${150 + (globalIdx * 80)}ms`,
                                "--rand-rot": randomRotation,
                                "--rand-x": randomXPx,
                                "--rand-y": randomYPx,
                              }}
                            >
                              <div className={`w-10 h-12 md:w-14 md:h-16 flex items-center justify-center text-2xl md:text-4xl shadow-md transform transition-all duration-300 ${styleClass}`}>
                                {char}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentView("stats")}
                className="hidden md:block text-white hover:text-[#E60012] font-black text-5xl transition-colors duration-200 active:scale-90 select-none shrink-0 cursor-pointer animate-[slap_0.4s_ease-out_both]"
                title="Next View"
                style={{ animationDelay: '1000ms' }}
              >
                ➔
              </button>
            </div>
          )}

          {/* VIEW B: UPSCALED, PERFECTLY MAPPED STAR SOCIAL STATS BOARD */}
          {currentView === "stats" && (
            <div className="flex flex-row items-center justify-end w-full h-full relative">
              
              {/* LEFT COLUMN: Protagonist Sliding In */}
              <div 
                className="fixed left-[-40%] md:left-[-3%] bottom-0 w-[110%] md:w-[80%] flex items-end justify-start pointer-events-none z-20 animate-[slide-in-left_0.6s_ease-out_both] [animation-delay:2000ms] md:[animation-delay:800ms]"
              >
                <img 
                  src="/images/Protagonist.png" 
                  alt="Protagonist" 
                  className="w-full h-auto object-contain drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]" 
                />
              </div>

              {/* RIGHT COLUMN: The Layered Star Social Stats Board */}
              <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 relative lg:self-end origin-center translate-x-4 md:translate-x-12">
                
                {/* Background Halftone Dots */}
                <div className="absolute inset-[-100px] pointer-events-none opacity-40 select-none z-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#555_2px,_transparent_2.5px)] bg-[size:16px_16px]" />
                </div>

                {/* Container for exactly sized stats */}
                <div className="w-[300px] md:w-[440px] h-[300px] md:h-[440px] relative flex items-center justify-center animate-[slap_0.4s_ease-out_both] z-10">
                  
                  {/* MATHEMATICAL STAR SVG STACK - TILTED TO THE RIGHT */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rotate-[8deg]" viewBox="0 0 100 100">
                    
                    {/* 1. Base Grey Star (Now Significantly Larger and slightly darker for depth) */}
                    <polygon 
                      points={perfectStarPoints} 
                      fill="#374151" 
                      className="origin-center scale-[2.2]" 
                    />

                    {/* 2. The Clean, Flat Yellow Star */}
                    <polygon 
                      points={perfectStarPoints} 
                      fill="#FACC15" 
                      className="origin-center scale-100 drop-shadow-sm"
                    />
                    
                    {/* 3. Outer Black Border (Offset for shadow effect) */}
                    <polygon 
                      points={perfectStarPoints} 
                      fill="none" stroke="#0F0F0F" strokeWidth="2.5" strokeLinejoin="round"
                      className="origin-center scale-[1.12] translate-x-[3px] translate-y-[3px]" 
                    />
                    
                    {/* 4. Inner Black Border */}
                    <polygon 
                      points={perfectStarPoints} 
                      fill="none" stroke="#0F0F0F" strokeWidth="2.5" strokeLinejoin="round"
                      className="origin-center scale-[1.05]" 
                    />

                    {/* Outer White Connection Dots at Star Tips */}
                    <g fill="#FFF" className="origin-center scale-[1.03]">
                      <circle cx="50" cy="0" r="1.5" />
                      <circle cx="98" cy="35" r="1.5" />
                      <circle cx="79" cy="90" r="1.5" />
                      <circle cx="21" cy="90" r="1.5" />
                      <circle cx="2" cy="35" r="1.5" />
                    </g>
                  </svg>

                  {/* 3. Stats Labels (Scaled Down) */}
                  
                  {/* Knowledge (Top) */}
                  <div className="absolute top-[-10px] md:top-[-20px] flex flex-col items-center -skew-x-6 z-20">
                    <div className="bg-black px-1.5 py-0.5 flex items-baseline gap-1 shadow-[2px_2px_0px_rgba(250,204,21,1)]">
                      <span className="text-yellow-400 font-black text-lg md:text-xl uppercase tracking-tighter">Knowledge</span>
                      <span className="text-black font-black text-base md:text-lg bg-yellow-400 px-1.5 leading-tight">8</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 w-full px-1">
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-black">EXP</span>
                      <div className="h-1 md:h-1.5 w-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[87%]"></div>
                      </div>
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-bold">61/70</span>
                    </div>
                  </div>

                  {/* Guts (Right) */}
                  <div className="absolute right-[-10px] md:right-[-25px] top-[32%] flex flex-col items-center -skew-x-6 z-20">
                    <div className="bg-black px-1.5 py-0.5 flex items-baseline gap-1 shadow-[2px_2px_0px_rgba(250,204,21,1)]">
                      <span className="text-yellow-400 font-black text-lg md:text-xl uppercase tracking-tighter">Guts</span>
                      <span className="text-black font-black text-base md:text-lg bg-yellow-400 px-1.5 leading-tight">7</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 w-full px-1">
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-black">EXP</span>
                      <div className="h-1 md:h-1.5 w-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[55%]"></div>
                      </div>
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-bold">33/60</span>
                    </div>
                  </div>

                  {/* Proficiency (Bottom Right - Static Red Compass) */}
                  <div className="absolute bottom-[20px] md:bottom-[15px] right-[-10px] md:right-[-20px] flex flex-col items-center -skew-x-6 z-20">
                    {/* Red Compass Background SVG (No Rotation, Scaled Down) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32 -z-10 flex items-center justify-center shadow-lg rounded-full">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="#E60012" />
                        <polygon points="50,5 58,42 95,50 58,58 50,95 42,58 5,50 42,42" fill="#FFF" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="50" cy="50" r="25" fill="none" stroke="#E60012" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="bg-transparent px-2 py-0.5 flex flex-col items-center drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)]">
                      <div className="flex items-baseline gap-1">
                        {/* Modified right here: Added strict red stroke outline using webkit text-stroke so it pops over the red background */}
                        <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter [-webkit-text-stroke:_1.5px_#990000] drop-shadow-md">Proficiency</span>
                        <span className="text-red-600 font-black text-lg md:text-xl bg-white px-1.5 leading-tight">10</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 w-[85%]">
                        <span className="text-white text-[8px] md:text-[10px] font-black drop-shadow-md">EXP</span>
                        <div className="h-1.5 md:h-2 w-full bg-black border border-white overflow-hidden">
                          <div className="h-full bg-white w-[32%]"></div>
                        </div>
                        <span className="text-white text-[8px] md:text-[10px] font-bold drop-shadow-md">32/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Kindness (Bottom Left) */}
                  <div className="absolute bottom-[20px] left-[-10px] md:left-[-15px] flex flex-col items-center -skew-x-6 z-20">
                    <div className="bg-black px-1.5 py-0.5 flex items-baseline gap-1 shadow-[2px_2px_0px_rgba(250,204,21,1)]">
                      <span className="text-yellow-400 font-black text-lg md:text-xl uppercase tracking-tighter">Kindness</span>
                      <span className="text-black font-black text-base md:text-lg bg-yellow-400 px-1.5 leading-tight">6</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 w-full px-1">
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-black">EXP</span>
                      <div className="h-1 md:h-1.5 w-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[78%]"></div>
                      </div>
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-bold">39/50</span>
                    </div>
                  </div>

                  {/* Charm (Left) */}
                  <div className="absolute left-[-20px] md:left-[-35px] top-[32%] flex flex-col items-center -skew-x-6 z-20">
                    <div className="bg-black px-1.5 py-0.5 flex items-baseline gap-1 shadow-[2px_2px_0px_rgba(250,204,21,1)]">
                      <span className="text-yellow-400 font-black text-lg md:text-xl uppercase tracking-tighter">Charm</span>
                      <span className="text-black font-black text-base md:text-lg bg-yellow-400 px-1.5 leading-tight">9</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 w-full px-1">
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-black">EXP</span>
                      <div className="h-1 md:h-1.5 w-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[57%]"></div>
                      </div>
                      <span className="text-yellow-400 text-[8px] md:text-[10px] font-bold">52/90</span>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* FINAL NAVIGATION ARROW TO START VIDEO TRANSITION */}
              <button
                onClick={triggerVideoTransition}
                className="fixed bottom-[30px] right-[40px] text-white hover:text-[#E60012] font-black text-6xl transition-colors duration-200 active:scale-90 select-none cursor-pointer animate-[slap_0.4s_ease-out_both] z-30"
                title="Awakening..."
                style={{ animationDelay: '2500ms' }}
              >
                ➔
              </button>
            </div>
          )}

          {/* --- STAGE 4: THE TOTAL SCREEN GRID FLOOD --- */}
          {startVideoTransition && !showVideo && (
            <div className="fixed inset-0 z-40 grid grid-cols-10 grid-rows-10 pointer-events-none w-screen h-screen">
              {transitionGrid.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full h-full p-px animate-screen-flood opacity-0"
                  style={{
                    animationDelay: item.delay,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase overflow-hidden border-2"
                    style={{ transform: `rotate(${item.rot})` }}
                  >
                    <div className={`w-full h-full flex items-center justify-center ${item.style}`}>
                      {item.char}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- STAGE 5: THE EMBEDDED INTRO VIDEO --- */}
          {showVideo && (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-video-fade overflow-hidden">
              <video
                className="w-full h-full object-contain pointer-events-auto"
                src="/videos/Persona_5_Royal_Intro.mp4"
                autoPlay
                controls
              />
            </div>
          )}

        </div>
      )}
    </div>
  );
}