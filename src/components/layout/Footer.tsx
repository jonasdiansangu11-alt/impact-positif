import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/our-work" },
  { label: "Services", href: "/solutions" },
  { label: "Prestataires", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
  { label: "Politique de confidentialité", href: "/privacy-policy" },
];

// Footer Component
function Footer() {
  return (
    <footer className="bg-foreground-950 text-background-100">


      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="inline-block cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-32 w-auto object-contain" />
          </Link>
          <p className="mt-6 text-background-100/70 text-sm leading-relaxed max-w-xs">
            Une Agence Internationale d'Expérience de Marque qui connecte les publics aux plus grandes marques du monde à travers des événements et expériences créatifs.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[
              { icon: "ri-linkedin-fill", href: "https://www.linkedin.com/company/impact-positif/" },
              { icon: "ri-instagram-line", href: "https://www.instagram.com/impactpositif/" },
              { icon: "ri-youtube-fill", href: "https://www.youtube.com/@impactpositif" },
              { icon: "ri-facebook-fill", href: "https://www.facebook.com/impactpositif" }
            ].map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="nofollow noopener"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 text-background-50 hover:bg-primary-500 hover:border-primary-500 transition-colors cursor-pointer"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="text-background-50 font-semibold mb-4 text-sm tracking-widest uppercase">
            Explorer
          </h5>
          <ul className="space-y-3">
            {navLinks.slice(0, 3).map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="text-background-100/70 hover:text-primary-400 transition-colors text-sm cursor-pointer">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="text-background-50 font-semibold mb-4 text-sm tracking-widest uppercase">
            Entreprise
          </h5>
          <ul className="space-y-3">
            {navLinks.slice(4).map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="text-background-100/70 hover:text-primary-400 transition-colors text-sm cursor-pointer">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="text-background-50 font-semibold mb-4 text-sm tracking-widest uppercase">
            Bureaux
          </h5>
          <ul className="space-y-3 text-background-100/70 text-sm">
            <li className="font-bold text-background-50 tracking-wider">MATADI</li>
            <li>Avenue Masunda Manoki 11 / Ville Haute</li>
            <li className="text-primary-400 mt-1 font-semibold">+243 818 897 000 - 850 849 310</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-background-50/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-background-100/60 text-xs md:text-sm">
            © 2026 IMPACT POSITIF | Tous droits réservés
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a 
                href="https://wa.me/243802221110" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-background-100/60 hover:text-red-500 hover:[text-shadow:0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300 text-xs md:text-sm cursor-pointer font-medium"
              >
                Développé par Jules EVANS ASEKE
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
