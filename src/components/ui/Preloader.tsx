import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initial load
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        setTimeout(() => setLoading(false), 1200);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    // Trigger on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-background-950 flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            {/* Spinning ring with Red, Purple, White */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-transparent"
              style={{
                background: 'conic-gradient(from 0deg, red, purple, white, red)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black 0)'
              }}
            />
            {/* Logo */}
            <motion.img 
              src="/images/logo.png" 
              alt="IMPACT POSITIF Logo" 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
