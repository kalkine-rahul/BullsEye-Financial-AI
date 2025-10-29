"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ChatPage from "../app/chat/page";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [gifVisible, setGifVisible] = useState(false);
  const [attentionAnim, setAttentionAnim] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  // Show attention animation periodically when chat is closed
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setAttentionAnim(true);
        setTimeout(() => setAttentionAnim(false), 2000);
      }, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [open]);

  // Close chat when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // If chat is open and click is outside both chat window and chat button
    if (
      open &&
      chatWindowRef.current &&
      !chatWindowRef.current.contains(event.target as Node) &&
      chatButtonRef.current &&
      !chatButtonRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);

  const toggleChat = () => {
    setOpen(prev => !prev);
    setAttentionAnim(false);
    if (!open) {
      setGifVisible(true);
      const timer = setTimeout(() => setGifVisible(false), 2500);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      {/* Enhanced Chat Window with Strong Border */}
      {open && (
        <div 
          ref={chatWindowRef}
          className="fixed bottom-28 right-6 w-80 h-[500px] bg-white shadow-2xl rounded-2xl border-4 border-blue-800 z-[1000] flex flex-col animate-slideUp"
        >
          {/* High-Contrast Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 rounded-t-xl border-b-4 border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-blue-600 text-sm font-bold">AI</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">BullsEye AI</h3>
                  <p className="text-blue-100 text-xs flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 bg-white/30 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors border border-white/50"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat Content */}
          <div className="flex-1 overflow-hidden bg-white">
            <ChatPage />
          </div>
        </div>
      )}

      {/* High-Visibility Welcome Bubble */}
      {(gifVisible || attentionAnim) && (
        <div className={`fixed bottom-44 right-6 z-[1002] animate-bounceEnhanced ${attentionAnim ? 'animate-attentionStrong' : ''}`}>
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-4 border-yellow-400">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
                <span className="text-white text-xs font-bold">✨</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Hello! I'm BullsEye AI</p>
                <p className="text-xs text-gray-700 mt-1">Ask me about stocks, markets, or investments!</p>
              </div>
            </div>
            {/* Speech bubble tip */}
            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-yellow-400 transform rotate-45 border-4 border-white rounded-br-lg"></div>
          </div>
          
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-2xl border-4 border-yellow-400 animate-pingSlow opacity-75 -m-1"></div>
        </div>
      )}

      {/* High-Contrast Floating Button */}
      <div className="fixed bottom-6 right-6 z-[1001]">
        <button
          ref={chatButtonRef}
          onClick={toggleChat}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`relative w-20 h-20 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center group ${
            open 
              ? 'bg-gradient-to-br from-gray-700 to-gray-900' 
              : 'bg-gradient-to-br from-blue-600 to-purple-700'
          } ${attentionAnim ? 'animate-pulseStrong' : ''}`}
          aria-label={open ? "Close chat" : "Open AI chat assistant"}
        >
          {/* Multiple animated rings for maximum visibility */}
          {isHovering && !open && (
            <>
              <div className="absolute inset-0 rounded-4xl bg-blue-400 animate-pingSlow opacity-30 -m-1"></div>
              <div className="absolute inset-0 rounded-4xl bg-blue-300 animate-pingSlower opacity-20 -m-2"></div>
            </>
          )}
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-4xl bg-blue-700 animate-pulseGlow"></div>
          
          {/* Button content */}
          <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
            {open ? (
              // Close icon - high contrast
              <div className=" rounded-lg p-2 shadow-inner">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ) : (
              // Animated GIF with border
              <div className="rounded-xl p-1 border-2 border-blue-300 shadow-inner">
                <Image
                  src="/chat-bot-icon.webp"
                  alt="AI Assistant"
                  width={45}
                  height={45}
                  className=""
                  priority
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Pulsing notification dot */}
          {attentionAnim && (
            <div className="absolute -top-2 -right-2 z-20">
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-pulseStrong"></div>
                <div className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full animate-pingFast border-2 "></div>
              </div>
            </div>
          )}

          {/* Glowing effect for attention */}
          {attentionAnim && (
            <div className="absolute inset-0 rounded-2xl bg-yellow-400 animate-pingGlow -m-1"></div>
          )}
        </button>

        {/* High-contrast tooltip */}
        {isHovering && (
          <div className="absolute bottom-24 right-0 bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-lg whitespace-nowrap animate-fadeIn border-2 border-yellow-400 shadow-2xl">
            {open ? 'Close AI Assistant' : 'Chat with BullsEye AI'}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-gray-900 transform rotate-45 border-r-2 border-b-2 border-yellow-400"></div>
          </div>
        )}

       
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounceEnhanced {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        
        @keyframes pulseStrong {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7), 0 10px 25px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(59, 130, 246, 0.2), 0 15px 35px rgba(0, 0, 0, 0.4);
          }
        }
        
        @keyframes pingFast {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes pingSlow {
          75%, 100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        @keyframes pingSlower {
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        
        @keyframes pingGlow {
          75%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes attentionStrong {
          0% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(3deg);
          }
          50% {
            transform: scale(1.15) rotate(-3deg);
          }
          75% {
            transform: scale(1.1) rotate(3deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-bounceEnhanced {
          animation: bounceEnhanced 2s infinite;
        }
        
        .animate-pulseStrong {
          animation: pulseStrong 2s infinite;
        }
        
        .animate-pingFast {
          animation: pingFast 1s infinite;
        }
        
        .animate-pingSlow {
          animation: pingSlow 2s infinite;
        }
        
        .animate-pingSlower {
          animation: pingSlower 2.5s infinite;
        }
        
        .animate-pingGlow {
          animation: pingGlow 1.5s infinite;
        }
        
        .animate-pulseGlow {
          animation: pulseGlow 2s infinite;
        }
        
        .animate-attentionStrong {
          animation: attentionStrong 1s ease-in-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}