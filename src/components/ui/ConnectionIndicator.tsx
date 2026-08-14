import { useState, useEffect } from 'react';
import { checkStrapiConnection } from '../../lib/api';

export default function ConnectionIndicator() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const check = async () => {
      const status = await checkStrapiConnection();
      setIsConnected(status);
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 group cursor-default"
      title={isConnected ? 'CMS Connecté' : 'CMS Déconnecté'}
    >
      <span
        className={`block w-2 h-2 rounded-full shadow-lg ${
          isConnected
            ? 'bg-emerald-400 animate-pulse shadow-emerald-400/50'
            : 'bg-red-500 shadow-red-500/50'
        }`}
      />
      <span className="text-[10px] font-mono tracking-wider uppercase opacity-0 group-hover:opacity-70 transition-opacity duration-300 text-white/60 select-none">
        {isConnected ? 'CMS' : 'Offline'}
      </span>
    </div>
  );
}
