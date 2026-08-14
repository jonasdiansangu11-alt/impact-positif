import React from 'react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  // Numéro à remplacer par le vrai numéro
  const whatsappNumber = "243000000000"; 
  const whatsappMessage = "Bonjour IMPACT POSITIF ! J'aimerais discuter d'un projet avec votre agence.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] hover:bg-[#20bd5a] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 cursor-pointer group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <i className="ri-whatsapp-line text-3xl sm:text-4xl"></i>
      {/* Ping effect behind the button */}
      <span className="absolute w-full h-full rounded-full border-2 border-[#25D366] animate-ping opacity-75 group-hover:opacity-0 transition-opacity"></span>
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-background-900 text-background-50 text-xs font-semibold py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-background-50/10 pointer-events-none">
        Discutons sur WhatsApp
        {/* Tooltip Arrow */}
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-[5px] border-transparent border-l-background-900"></span>
      </span>
    </motion.a>
  );
}
