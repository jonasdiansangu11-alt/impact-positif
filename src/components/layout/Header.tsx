import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const headerEl = document.querySelector('header.fixed');
      let activeElement: HTMLElement | null = null;

      if (headerEl) {
        headerEl.classList.add('pointer-events-none');
        const elAtPoint = document.elementFromPoint(window.innerWidth / 2, 40);
        headerEl.classList.remove('pointer-events-none');

        if (elAtPoint) {
          let current: Element | null = elAtPoint;
          while (current && current !== document.body) {
            const tagName = current.tagName;
            const style = window.getComputedStyle(current);
            const bg = style.backgroundColor;
            
            if (
              (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') ||
              tagName === 'SECTION' ||
              tagName === 'FOOTER' ||
              tagName === 'MAIN' ||
              current.classList.contains('bg-background-50') ||
              current.classList.contains('bg-background-100') ||
              current.classList.contains('bg-background-950')
            ) {
              activeElement = current as HTMLElement;
              break;
            }
            current = current.parentElement;
          }
        }
      }

      if (activeElement) {
        const style = window.getComputedStyle(activeElement);
        const bg = style.backgroundColor;

        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            setIsDarkBg(luma < 140);
            return;
          }
        }

        const classes = activeElement.className || '';
        const darkClasses = ['bg-background-950', 'bg-foreground-950', 'bg-black', 'bg-gray-950', 'bg-red-950', 'bg-primary-950', 'bg-slate-950'];
        const hasDarkClass = darkClasses.some(cls => classes.includes(cls));
        if (hasDarkClass) {
          setIsDarkBg(true);
          return;
        }

        const lightClasses = ['bg-background-50', 'bg-background-100', 'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-slate-50'];
        const hasLightClass = lightClasses.some(cls => classes.includes(cls));
        if (hasLightClass) {
          setIsDarkBg(false);
          return;
        }

        if (activeElement.tagName === 'SECTION' && (activeElement.querySelector('iframe') || activeElement.innerHTML.includes('IMPACT POSITIF'))) {
          setIsDarkBg(true);
          return;
        }
      } else {
        setIsDarkBg(scrollY < 400);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 ${
        scrolled 
          ? isDarkBg 
            ? 'bg-background-950/80 backdrop-blur-md border-b border-background-50/10' 
            : 'bg-background-50/85 backdrop-blur-md border-b border-foreground-950/5'
          : 'bg-transparent'
      }`}>
        <div className="relative w-full px-6 md:px-10 lg:px-16 flex items-center justify-between">
          {/* Left Menu (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 z-50">
            {[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/our-work" },
              { label: "Services", href: "/solutions" },
              { label: "Prestataires", href: "/partenaires" }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-semibold hover:text-red-500 transition-colors duration-300 cursor-pointer whitespace-nowrap hvr-underline ${
                  isDarkBg ? 'text-background-50' : 'text-foreground-950'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo (Centered) */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-50 flex items-center">
            <Link
              to="/"
              className="flex items-center cursor-pointer font-sans font-black text-xl sm:text-2xl lg:text-3xl tracking-wider uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
              aria-label="IMPACT POSITIF home"
            >
              <span className="text-red-600 font-extrabold drop-shadow-md">IMPACT</span>
              <span className="text-white font-extrabold drop-shadow-md ml-1">POSITIF</span>
            </Link>
          </div>
          
          {/* Actions & Buttons (Right-aligned) */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-0 z-50">
            {/* Store Button */}
            <a
              href="https://app.chariow.com/stores/store_lsrffcalbjtu/products?status=all"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                isDarkBg 
                  ? 'border-background-50/20 text-background-50 hover:bg-background-50/10 hover:border-background-50/40'
                  : 'border-foreground-950/20 text-foreground-950 hover:bg-foreground-950/5 hover:border-foreground-950/40'
              }`}
              aria-label="Boutique"
              title="Visitez notre boutique en ligne"
            >
              <i className="ri-store-2-line text-base sm:text-lg"></i>
            </a>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                isDarkBg 
                  ? 'border-background-50/20 text-background-50 hover:bg-background-50/10 hover:border-background-50/40'
                  : 'border-foreground-950/20 text-foreground-950 hover:bg-foreground-950/5 hover:border-foreground-950/40'
              }`}
              aria-label="Rechercher"
            >
              <i className="ri-search-line text-base sm:text-lg"></i>
            </button>

            {/* Contactez-nous button */}
            <Link
              to="/contact"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-lg shadow-red-600/20 border border-white/10"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </header>

      {/* Professional Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-red-600 transition-colors cursor-pointer"
            aria-label="Fermer la recherche"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          
          <div className="w-full max-w-3xl flex flex-col gap-4">
            <span className="text-sm font-mono text-primary-400 tracking-widest uppercase mb-2">Recherche Globale</span>
            <div className="relative">
              <i className="ri-search-line absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-background-50/50"></i>
              <input 
                type="text" 
                placeholder="Que recherchez-vous ?" 
                className="w-full bg-transparent border-b-2 border-background-50/20 focus:border-red-600 text-3xl sm:text-5xl text-background-50 placeholder:text-background-50/30 py-6 pl-12 pr-6 outline-none transition-colors"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                  if (e.key === 'Enter') {
                    // Logic to handle search submission
                    setIsSearchOpen(false);
                  }
                }}
              />
            </div>
            <p className="text-background-100/50 text-sm mt-4 font-mono">Appuyez sur Entrée pour rechercher ou Échap pour fermer.</p>
          </div>
        </div>
      )}
    </>
  );
}
