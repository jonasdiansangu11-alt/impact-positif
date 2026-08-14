import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchServices, fetchRealizations } from '../../lib/api';

export default function Header() {
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [dynamicIndex, setDynamicIndex] = useState<{title: string, href: string, category: string, description?: string}[]>([]);

  useEffect(() => {
    const loadSearchData = async () => {
      const [services, realizations] = await Promise.all([
        fetchServices(),
        fetchRealizations()
      ]);
      
      const newIndex: {title: string, href: string, category: string, description?: string}[] = [
        { title: "Accueil", href: "/", category: "Page" },
        { title: "Médiathèque", href: "/mediatheque", category: "Page" },
        { title: "Nos Réalisations", href: "/our-work", category: "Page" },
        { title: "Services & Solutions", href: "/solutions", category: "Page" },
        { title: "Contact", href: "/contact", category: "Page" },
        { title: "Prestataires & Partenaires", href: "/partenaires", category: "Page" }
      ];

      services.forEach((s: any) => {
        const title = s.attributes?.title || s.title;
        const description = s.attributes?.description || s.description;
        if (title) newIndex.push({ title, href: "/solutions", category: "Service", description });
      });

      realizations.forEach((r: any) => {
        const title = r.attributes?.title || r.title;
        const summary = r.attributes?.summary || r.summary;
        const documentId = r.documentId || r.id;
        if (title) newIndex.push({ title, href: `/our-work/${documentId}`, category: "Réalisation", description: summary });
      });

      setDynamicIndex(newIndex);
    };
    loadSearchData();
  }, []);

  const searchResults = searchQuery.length > 1 
    ? dynamicIndex.filter(item => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) || 
               item.category.toLowerCase().includes(query) || 
               (item.description && item.description.toLowerCase().includes(query));
      })
    : [];

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
        <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo (Mobile Left / Desktop Center) */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-50 flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="IMPACT POSITIF home"
            >
              <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-md" />
            </Link>
          </div>

          {/* Left Menu (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 z-50 flex-1">
            {[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/our-work" },
              { label: "Services", href: "/solutions" },
              { label: "Médiathèque", href: "/mediatheque" },
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
          
          {/* Actions & Buttons (Right-aligned) */}
          <div className="flex items-center gap-1.5 sm:gap-3 ml-auto lg:ml-0 z-50 shrink-0">
            {/* Store Button (Hidden on very small mobile) */}
            <a
              href="https://app.chariow.com/stores/store_lsrffcalbjtu/products?status=all"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex w-9 h-9 sm:w-12 sm:h-12 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                isDarkBg 
                  ? 'border-background-50/20 text-background-50 hover:bg-background-50/10 hover:border-background-50/40'
                  : 'border-foreground-950/20 text-foreground-950 hover:bg-foreground-950/5 hover:border-foreground-950/40'
              }`}
              aria-label="Boutique"
              title="Visitez notre boutique en ligne"
            >
              <i className="ri-store-2-line text-sm sm:text-lg"></i>
            </a>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                isDarkBg 
                  ? 'border-background-50/20 text-background-50 hover:bg-background-50/10 hover:border-background-50/40'
                  : 'border-foreground-950/20 text-foreground-950 hover:bg-foreground-950/5 hover:border-foreground-950/40'
              }`}
              aria-label="Rechercher"
            >
              <i className="ri-search-line text-sm sm:text-lg"></i>
            </button>

            {/* Contactez-nous button */}
            <Link
              to="/contact"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-sm font-semibold px-2.5 sm:px-6 py-2 sm:py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-lg shadow-red-600/20 border border-white/10"
            >
              Contactez-nous
            </Link>

            {/* Mobile Menu Burger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                isDarkBg 
                  ? 'border-background-50/20 text-background-50 hover:bg-background-50/10 hover:border-background-50/40'
                  : 'border-foreground-950/20 text-foreground-950 hover:bg-foreground-950/5 hover:border-foreground-950/40'
              }`}
              aria-label="Menu"
            >
              <i className="ri-menu-line text-sm sm:text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-background-950/95 backdrop-blur-xl flex flex-col p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pl-[calc(env(safe-area-inset-left)+1.5rem)] pr-[calc(env(safe-area-inset-right)+1.5rem)] animate-in fade-in duration-300 lg:hidden">
          <div className="flex justify-between items-center w-full mb-12">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
              <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-16 w-auto object-contain" />
            </Link>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-red-600 transition-colors"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-center">
            {[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/our-work" },
              { label: "Services", href: "/solutions" },
              { label: "Médiathèque", href: "/mediatheque" },
              { label: "Prestataires", href: "/partenaires" },
              { label: "Boutique en ligne", href: "https://app.chariow.com/stores/store_lsrffcalbjtu/products?status=all" }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold text-background-50 hover:text-red-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Professional Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+1.5rem)] animate-in fade-in duration-300">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-[calc(env(safe-area-inset-top)+1.5rem)] right-[calc(env(safe-area-inset-right)+1.5rem)] sm:top-10 sm:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-background-50/10 text-background-50 hover:bg-red-600 transition-colors cursor-pointer"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    navigate(searchResults[0].href);
                  }
                }}
              />
            </div>
            
            {/* Search Results */}
            {searchQuery.length > 1 && (
              <div className="mt-6 flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      to={result.href}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between p-4 bg-background-900/50 hover:bg-background-800 rounded-lg transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-background-50 group-hover:text-red-500 transition-colors">{result.title}</span>
                        <span className="text-xs font-mono text-red-400 uppercase tracking-widest">{result.category}</span>
                      </div>
                      <i className="ri-arrow-right-line text-background-50/30 group-hover:text-red-500 group-hover:translate-x-1 transition-all"></i>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-background-100/40 font-mono">
                    Aucun résultat trouvé pour "{searchQuery}".
                  </div>
                )}
              </div>
            )}
            
            <p className="text-background-100/50 text-sm mt-4 font-mono">
              Appuyez sur Entrée pour accéder au premier résultat ou Échap pour fermer.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
