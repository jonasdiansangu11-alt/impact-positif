import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the window to load completely, or timeout after a maximum of 3 seconds.
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === 'complete') {
      // Small delay just to ensure the animation is seen and feels premium
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleLoad);
      const timer = setTimeout(() => setLoading(false), 3000); // Fallback timeout
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-background-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-background-950 to-background-950 animate-pulse"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Image Animation */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-8"
            >
              <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-24 sm:h-32 w-auto object-contain drop-shadow-2xl" />
            </motion.div>

            {/* Loading Progress Line */}
            <div className="w-48 sm:w-64 h-[2px] bg-background-800 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-0 bottom-0 w-1/2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
              ></motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xs font-mono text-background-100/40 uppercase tracking-[0.3em] mt-6"
            >
              Création d'expériences...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
