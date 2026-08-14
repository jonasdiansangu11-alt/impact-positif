import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Extend the Window interface to include the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed the prompt in this session
    const wasDismissed = sessionStorage.getItem('pwa-install-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    const handler = (e: BeforeInstallPromptEvent) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show our custom banner after a small delay (let the user see the site first)
      setTimeout(() => setShowBanner(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Trigger the native install prompt
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-[9998] max-w-sm"
        >
          <div className="bg-background-900/95 backdrop-blur-xl border border-background-50/15 rounded-2xl shadow-2xl shadow-black/50 p-5 relative overflow-hidden">
            {/* Gradient accent on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-400"></div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-background-50/10 hover:bg-background-50/20 text-background-50/50 hover:text-background-50 transition-all cursor-pointer"
              aria-label="Fermer"
            >
              <i className="ri-close-line text-sm"></i>
            </button>

            {/* Content */}
            <div className="flex items-start gap-4">
              {/* App Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30">
                <span className="text-white font-black text-lg tracking-tighter">IP</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-background-50 font-bold text-sm leading-tight mb-1">
                  Installer IMPACT POSITIF
                </h3>
                <p className="text-background-100/50 text-xs leading-relaxed mb-3">
                  Ajoutez notre application à votre écran d'accueil pour un accès rapide et une expérience optimale.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <i className="ri-download-2-line text-sm"></i>
                    Installer
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="text-background-100/40 hover:text-background-100/70 text-xs font-medium py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Plus tard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
