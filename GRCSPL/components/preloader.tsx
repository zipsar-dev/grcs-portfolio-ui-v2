"use client"
import { useState, useEffect } from 'react';
import { Package, Truck, Users, ShoppingCart, Zap, Network } from 'lucide-react';

const FMCGPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "Connecting your network...",
    "Loading fresh products...",
    "Syncing your orders...",
    "Preparing your dashboard...",
    "Almost ready!"
  ];

  const icons = [Network, Package, ShoppingCart, Truck, Zap];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  if (!isVisible) return null;

  const CurrentIcon = icons[currentMessage];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center z-50">
      {/* Animated background particles */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `linear-gradient(135deg, #39b54b, #2d8f3a)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div> */}

      <div className="text-center relative z-10 max-w-md mx-auto px-8">
        {/* Logo Container with Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Rotating outer ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-r-green-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Logo background with pulse effect */}
            <div className="absolute inset-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-500 rounded-full animate-pulse opacity-75"></div>
              
              {/* Your logo would go here - using a placeholder for demo */}
              <div className="relative z-10 text-white font-bold text-3xl">
                <img
                  src="/GR.png"
                  alt="logo"
                  className="w-[60px] h-full object-cover"
                />
              </div>
            </div>

            {/* Floating icons around logo */}
            <div className="absolute inset-0">
              {icons.map((Icon, index) => (
                <div
                  key={index}
                  className={`absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-500 ${
                    currentMessage === index ? 'scale-110 bg-green-100' : 'scale-90 opacity-60'
                  }`}
                  style={{
                    left: `${50 + 45 * Math.cos((index * 2 * Math.PI) / icons.length - Math.PI/2)}%`,
                    top: `${50 + 45 * Math.sin((index * 2 * Math.PI) / icons.length - Math.PI/2)}%`,
                    marginLeft: '-16px',
                    marginTop: '-16px',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <Icon size={16} className="text-green-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company name with typing effect */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              GRCSPL
            </span>
          </h1>
          <p className="text-gray-600 text-sm">Direct Selling Excellence</p>
        </div>

        {/* Dynamic message with icon */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-green-100">
            <CurrentIcon size={20} className="text-green-600 animate-pulse" />
            <span className="text-gray-700 font-medium text-sm">
              {messages[currentMessage]}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Network stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-green-100">
            <div className="text-lg font-bold text-green-600">1K+</div>
            <div className="text-xs text-gray-600">Partners</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-green-100">
            <div className="text-lg font-bold text-green-600">500+</div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-green-100">
            <div className="text-lg font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default FMCGPreloader;