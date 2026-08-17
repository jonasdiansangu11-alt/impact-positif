import ConnectionIndicator from './components/ui/ConnectionIndicator';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import MediathequePage from './pages/MediathequePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Seo from './components/seo/Seo';
import React, { useState, useEffect, useRef } from "react";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Project, NavLink } from "./types";
import { fetchHero, fetchAbout, fetchServices, fetchLocation, fetchGlobal, fetchTestimonials, fetchRealizations, fetchAds, fetchFeaturedProject, submitMessage, getStrapiMediaUrl } from "./lib/api";
import TestimonialsSection from "./components/ui/testimonial-v2";
import AdBanner from "./components/ui/AdBanner";
import Preloader from "./components/ui/Preloader";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import InstallPrompt from "./components/ui/InstallPrompt";

// Core Projects List
const projects: Project[] = [
  {
    id: "forum-eco-2025",
    title: "Forum Économique de Kinshasa 2025",
    category: "Sommet d'Affaires",
    summary:
      "Conception et production intégrale du sommet annuel au Centre Financier de Kinshasa. Scénographie immersive, keynote stage LED 360° et expériences networking interactives.",
    image: "/images/IMG_3294.jpg",
    href: "/case-studies/forum-eco-2025",
  },
  {
    id: "finance-africaine",
    title: "Sommet de la Finance Africaine",
    category: "Conférence Financière",
    summary:
      "Activation premium pour la Rawbank sur le plus grand événement financier de la RDC. Pavillon interactif de 800 m² avec démonstrations en direct et espace VIP d'exception.",
    image: "/images/IMG_3247.jpg",
    href: "/case-studies/finance-africaine",
  },
  {
    id: "rdc-tech-expo",
    title: "RDC Tech Innovation Expo",
    category: "Activation de Marque",
    summary:
      "Tournée technologique majeure à travers 5 grandes villes de la RDC pour présenter les innovations numériques. Scénographie modulaire, dômes interactifs et expériences connectées.",
    image: "/images/IMG_3225.jpg",
    href: "/case-studies/rdc-tech-expo",
  },
  {
    id: "gala-excellence",
    title: "Gala National de l'Excellence",
    category: "Soirée de Prestige",
    summary:
      "Soirée de gala d'exception célébrant le génie et l'entrepreneuriat congolais. Décoration somptueuse, direction artistique raffinée et retransmission télévisée en direct.",
    image: "/images/IMG_3079.jpg",
    href: "/case-studies/gala-excellence",
  },
  {
    id: "investisseurs-miniers",
    title: "Symposium des Investisseurs Miniers",
    category: "Sommet Stratégique",
    summary:
      "Forum de haut niveau réunissant des délégations internationales à Kolwezi. Direction artistique d'une élégance rare, sécurité présidentielle et pavillons d'exposition haut de gamme.",
    image: "/images/DSCF8096.jpg",
    href: "/case-studies/investisseurs-miniers",
  },
  {
    id: "telecom-summit",
    title: "Telecom Transformation Summit",
    category: "Salon Professionnel",
    summary:
      "Événement d'envergure dédié à la transformation des télécoms en Afrique centrale. Stands interactifs immersifs, pitchs de start-ups et panels stratégiques captivants.",
    image: "/images/IMG_20251118_093325_969.jpg",
    href: "/case-studies/telecom-summit",
  },
  {
    id: "forum-numerique",
    title: "Forum National du Numérique",
    category: "Conférence Technologique",
    summary:
      "Conférence nationale axée sur la souveraineté numérique et le cloud souverain en Afrique. Expérience hybride d'exception combinant keynotes inspirantes et hackathons de génie.",
    image: "/images/472537940_9486448048055010_7383733551397155173_n.jpg",
    href: "/case-studies/forum-numerique",
  },
  {
    id: "festival-creatif",
    title: "Festival des Industries Créatives",
    category: "Festival & Exposition",
    summary:
      "Célébration majeure de la culture, du design et du motion design africain à Kinshasa. Masterclasses immersives de renommée mondiale et galeries d'exposition virtuelles.",
    image: "/images/484791148_9917717734928037_2835140427910031556_n.jpg",
    href: "/case-studies/festival-creatif",
  },
];

const brandLogos = [
  { name: "Rawbank", src: "/images/rawbank.jpeg" },
  { name: "Illico", src: "/images/illico.jpeg" },
  { name: "Aurora", src: "/images/aurora.jpeg" },
];

const navLinks: NavLink[] = [
  { label: "Nos prestations", href: "/what-we-do" },
  { label: "Nos réalisations", href: "/our-work" },
  { label: "Nos prestataires", href: "/partenaires" },
  { label: "Qui sommes-nous", href: "/who-we-are" },
  { label: "IMPACT Feed", href: "/impact-feed" },
  { label: "Services", href: "/solutions" },
  { label: "Contact", href: "/contact" },
  { label: "Carrières", href: "/careers" },
];

const footerExplorerLinks: NavLink[] = [
  { label: "Nos prestations", href: "/what-we-do" },
  { label: "Nos réalisations", href: "/our-work" },
  { label: "Qui sommes-nous", href: "/who-we-are" },
];

const footerCompanyLinks: NavLink[] = [
  { label: "Services", href: "/solutions" },
  { label: "Contact", href: "/contact" },
  { label: "Carrières", href: "/careers" },
];

// Helper animation component for fade-in and slide-up on scroll
function FadeInUp({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  key?: React.Key;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Helper animation for progressive reveal of text blocks
function RevealText({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  key?: React.Key;
}) {
  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        initial={{ y: "40px", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Helper animation for progressive reveal of images
function RevealImage({
  children,
  delay = 0,
  duration = 1.2,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  key?: React.Key;
}) {
  return (
    <div className="overflow-hidden relative w-full h-full min-h-[420px] lg:min-h-[700px]">
      <motion.div
        initial={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          scale: 1.15,
        }}
        whileInView={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Hero Section Component
function Hero() {
  const [heroData, setHeroData] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDevisOpen, setIsDevisOpen] = useState(false);
  const [devisStatus, setDevisStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetchHero().then(data => {
      if (data) setHeroData(data);
    });
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* ── HERO CONTENT ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black z-0">
        {heroData?.videoFile || heroData?.videoUrl ? (
          <video
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.35] pointer-events-none object-cover"
            src={getStrapiMediaUrl(heroData?.videoFile) || heroData?.videoUrl}
            poster={getStrapiMediaUrl(heroData?.posterImage) || heroData?.posterUrl}
            autoPlay
            muted
            loop
            playsInline
            style={{
              filter: "brightness(0.72) contrast(1.08) saturate(1.15)",
            }}
          />
        ) : (
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.35] pointer-events-none"
            src="https://www.youtube.com/embed/0W3s4yotSBs?autoplay=1&mute=1&loop=1&playlist=0W3s4yotSBs&controls=0&showinfo=0&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{
              filter: "brightness(0.72) contrast(1.08) saturate(1.15)",
              border: "none",
            }}
          ></iframe>
        )}

        {/* Multi-layer cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        {/* Luxury warm-gold bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0500]/80 to-transparent" />

        {/* Cinematic scanlines texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
          }}
        />

        {/* Ambient glow rings – luxury event feel */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.12] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 70%)",
            animation: "hero-pulse 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.07] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,80,0.4) 0%, transparent 70%)",
            animation: "hero-pulse 7s ease-in-out infinite 1.5s",
          }}
        />

        {/* Top-left golden corner deco */}
        <svg
          className="absolute top-10 left-10 opacity-30 pointer-events-none"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path d="M4 4 L4 76" stroke="url(#gold1)" strokeWidth="1.5" />
          <path d="M4 4 L76 4" stroke="url(#gold1)" strokeWidth="1.5" />
          <circle cx="4" cy="4" r="3" fill="#c9a84c" />
          <defs>
            <linearGradient id="gold1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        {/* Bottom-right golden corner deco */}
        <svg
          className="absolute bottom-10 right-10 opacity-30 pointer-events-none rotate-180"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path d="M4 4 L4 76" stroke="url(#gold2)" strokeWidth="1.5" />
          <path d="M4 4 L76 4" stroke="url(#gold2)" strokeWidth="1.5" />
          <circle cx="4" cy="4" r="3" fill="#c9a84c" />
          <defs>
            <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-28 select-none">
        {/* Premium eyebrow badge removed */}
        <FadeInUp delay={0.2}>
          <h1 className="text-white font-sans tracking-tight leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
            <span className="font-light">{heroData?.titlePrefix || "Nous sommes"} </span>
            <span
              className="font-extrabold text-primary-500"
              style={{ textShadow: "0 0 40px var(--color-primary-500)" }}
            >
              {heroData?.titleHighlight1 || "IMPACT"}
            </span>{" "}
            <span className="font-extrabold text-red-500">{heroData?.titleHighlight2 || "POSITIF"}</span>
            <sup className="text-xs md:text-sm font-medium align-super select-none">
              ™
            </sup>
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <p className="mt-4 md:mt-6 text-white/80 text-base sm:text-xl md:text-2xl lg:text-3xl max-w-4xl font-normal leading-normal">
            Agence Événementielle – Créateurs d'expériences inoubliables
          </p>
        </FadeInUp>

        {/* Divider line */}
        <FadeInUp delay={0.5}>
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-70" />
        </FadeInUp>

        {/* Pulsing play button */}
        <FadeInUp delay={0.65}>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            id="hero-play-btn"
            aria-label="Regarder la vidéo Rawbank Muanda"
            className="mt-8 group cursor-pointer flex flex-col items-center gap-3 text-white hover:text-red-400 transition-colors duration-300"
          >
            <div className="relative flex items-center justify-center">
              {/* Ripple rings */}
              <span className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-50 group-hover:border-red-500/40" />
              <span
                className="absolute w-28 h-28 rounded-full border border-white/10 animate-ping opacity-30 group-hover:border-red-500/20"
                style={{ animationDelay: "0.3s" }}
              />
              {/* Play button circle */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/40 group-hover:border-red-500 group-hover:bg-red-500/20 backdrop-blur-sm flex items-center justify-center transition-all duration-400">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 ml-1 text-white group-hover:text-red-400 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <span className="text-sm md:text-base font-medium tracking-[0.15em] uppercase text-white/70 group-hover:text-white transition-colors">
              Voir la bande d annonce
            </span>
          </button>
        </FadeInUp>
      </div>

      {/* Demandez un devis button — bottom left */}
      <div className="absolute left-6 md:left-10 lg:left-16 bottom-20 md:bottom-24 z-10">
        <FadeInUp delay={0.8}>
          <button
            onClick={() => setIsDevisOpen(true)}
            className="group flex items-center gap-3 bg-white/10 hover:bg-red-600 backdrop-blur-md border border-white/20 hover:border-red-500 text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full transition-all duration-400 cursor-pointer shadow-lg hover:shadow-red-600/30"
          >
            <i className="ri-file-text-line text-lg sm:text-xl group-hover:rotate-6 transition-transform"></i>
            <span className="text-sm sm:text-base font-semibold tracking-wide">
              Demandez un devis
            </span>
            <i className="ri-arrow-right-line text-base opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></i>
          </button>
        </FadeInUp>
      </div>

      {/* Floating social links */}
      <div className="hidden lg:flex absolute right-6 bottom-24 z-10 flex-col gap-3">
        {[
          {
            icon: "ri-linkedin-fill",
            href: "https://www.linkedin.com/company/impact-positif/",
          },
          {
            icon: "ri-instagram-line",
            href: "https://www.instagram.com/impactpositif/",
          },
          {
            icon: "ri-youtube-fill",
            href: "https://www.youtube.com/@impactpositif",
          },
        ].map((social) => (
          <a
            key={social.icon}
            href={social.href}
            target="_blank"
            rel="nofollow noopener"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all cursor-pointer"
          >
            <i className={`${social.icon} text-base`}></i>
          </a>
        ))}
      </div>

      {/* ── FULLSCREEN VIDEO LIGHTBOX MODAL ── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/97 backdrop-blur-xl p-4 sm:p-6 md:p-10">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsVideoModalOpen(false)}
          />
          {/* Gold border glow */}
          <div className="relative w-full max-w-6xl z-10">
            <div
              className="absolute -inset-[2px] rounded-2xl opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, #c9a84c, transparent, #c9a84c)",
              }}
            />
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/80 backdrop-blur border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer"
                aria-label="Fermer la vidéo"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/0W3s4yotSBs?autoplay=1&rel=0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* ── DEVIS MODAL ── */}
      {isDevisOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl overflow-y-auto">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsDevisOpen(false)}
          />
          <div className="relative z-10 min-h-full flex items-start justify-center py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-10">
            <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Left — Image */}
              <div className="hidden lg:block relative min-h-[600px]">
                <img
                  src="/images/forum.jpg"
                  alt="Événement IMPACT POSITIF"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-red-500 font-extrabold text-2xl">
                    IMPACT
                  </span>
                  <span className="text-white font-extrabold text-2xl ml-1">
                    POSITIF
                  </span>
                  <p className="text-white/70 text-sm mt-2">
                    Créateurs d'expériences inoubliables en RDC
                  </p>
                </div>
              </div>

              {/* Right — Form */}
              <div className="bg-black border-l border-red-500/20 p-6 sm:p-8 md:p-10 relative max-h-[90vh] lg:max-h-none overflow-y-auto">
                <button
                  onClick={() => setIsDevisOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  aria-label="Fermer le formulaire de devis"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight mb-1">
                  Demandez un devis
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  Remplissez le formulaire et notre équipe vous répondra sous
                  24h.
                </p>

                {devisStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                      <i className="ri-checkbox-circle-line text-4xl text-red-500"></i>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Demande envoyée avec succès !
                    </h4>
                    <p className="text-white/60 text-sm max-w-sm">
                      Merci pour votre confiance. Notre équipe commerciale vous
                      contactera très prochainement.
                    </p>
                    <button
                      onClick={() => {
                        setIsDevisOpen(false);
                        setDevisStatus("idle");
                      }}
                      className="mt-8 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer text-sm font-semibold"
                    >
                      Fermer
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setDevisStatus("loading");
                      try {
                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData.entries());
                        const subject = encodeURIComponent(`Demande de devis - ${data.eventType}`);
                        const body = encodeURIComponent(`Nouveau devis :
Type: ${data.eventType}
Date: ${data.eventDate}
Nom: ${data.firstName} ${data.lastName}
Email: ${data.email}
Téléphone: ${data.phone}
Société: ${data.company}
Message: ${data.message}`);
                        
                        window.location.href = `mailto:contact@impactpositif.com?subject=${subject}&body=${body}`;
                        setDevisStatus("success");
                      } catch (error) {
                        console.error("Form error:", error);
                        setDevisStatus("error");
                      }
                    }}
                    className="flex flex-col gap-5"
                  >
                    {/* Row 1: Type + Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Type d'évènement{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="eventType"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Sélectionner...</option>
                          <option>Conférence / Sommet</option>
                          <option>Forum Économique</option>
                          <option>Gala / Soirée de Prestige</option>
                          <option>Lancement de Produit</option>
                          <option>Salon / Exposition</option>
                          <option>Activation de Marque</option>
                          <option>Événement Privé</option>
                          <option>Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Date de l'évènement{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="eventDate"
                          type="date"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-red-500 focus:outline-none transition-colors cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Row 2: Prénom + Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="firstName"
                          type="text"
                          required
                          placeholder="Jean"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          required
                          placeholder="KABONGO"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Email + Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="jean.kabongo@exemple.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder="+243 99 123 4567"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-white font-semibold text-sm mb-1.5 block">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="Décrivez votre projet..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Lieu + Nombre */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Lieu de l'événement
                        </label>
                        <input
                          name="location"
                          type="text"
                          placeholder="Kinshasa, RDC"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-white font-semibold text-sm mb-1.5 block">
                          Nombre de personnes
                        </label>
                        <input
                          name="attendees"
                          type="number"
                          placeholder="500"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-sm focus:border-red-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        name="callRequested"
                        type="checkbox"
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-teal-500 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                        Je souhaite être rappelé(e){" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={devisStatus === "loading"}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {devisStatus === "loading" ? (
                        <>
                          <i className="ri-loader-4-line text-xl animate-spin"></i>{" "}
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-fill text-xl"></i> Envoyer
                          ma demande
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes hero-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.12; }
          50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.22; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

// Notre Approche Section Component
function Approach() {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    fetchAbout().then(data => {
      if (data) setAboutData(data);
    });
  }, []);

  return (
    <section className="bg-background-50 py-16 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="sticky top-32">
          <RevealText delay={0.1}>
            <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-600 uppercase mb-6">
              Qui sommes-nous ?
            </span>
          </RevealText>
          <RevealText delay={0.25}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground-950 mb-6">
              {aboutData?.whoAreWeTitle || "NOTRE IDENTITÉ"}
            </h2>
          </RevealText>
          
          <RevealText delay={0.35}>
            <div className="mt-8 p-6 lg:p-8 bg-white border border-background-200 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110"></div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-background-50 shadow-lg">
                    <img
                      src="/impact-event-photo.jpg"
                      alt="Jonas Diansangu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    <i className="ri-medal-fill text-sm"></i>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-xl font-bold text-foreground-950 font-heading">JONAS DIANSANGU</h4>
                  <p className="text-primary-600 font-semibold text-xs tracking-[0.2em] uppercase mt-1 mb-3">General Manager</p>
                  <p className="text-sm text-foreground-700 leading-relaxed">
                    Expert en stratégie et déploiement d'actions BTL avec une maîtrise pointue du marché du Kongo-Central. Son approche méthodique assure un ROI optimal pour nos partenaires.
                  </p>
                </div>
              </div>
            </div>
          </RevealText>
        </div>

        <div className="lg:pt-0 space-y-10">
          <RevealText delay={0.2}>
            <p className="text-lg md:text-xl text-foreground-700 leading-relaxed font-medium">
              {aboutData?.whoAreWeContent || "Créée en 2015, IMPACT POSITIF est une Agence Conseil en Marketing spécialisée dans la communication, la stratégie marketing et l'accompagnement des entreprises. Nous prenons le temps de comprendre parfaitement la structure de nos clients, leurs atouts et leurs objectifs avant de proposer une solution sur-mesure, alignée sur leurs valeurs et leur image."}
            </p>
          </RevealText>
          
          <RevealText delay={0.3}>
            <div className="bg-background-100 p-6 md:p-8 rounded-2xl border-l-4 border-primary-500">
              <h3 className="text-xl font-bold text-foreground-950 flex items-center gap-3">
                <i className="ri-focus-3-line text-primary-500"></i>
                {aboutData?.ourRoleTitle || "NOTRE RÔLE"}
              </h3>
              <p className="text-md text-foreground-700 leading-relaxed mt-4">
                {aboutData?.ourRoleContent || "Grâce à notre équipe jeune et dynamique, nous avons la capacité d'intervenir partout pour répondre à vos problématiques de communication et de vente. Notre particularité réside dans notre engagement à fournir un travail de qualité, soigné, perfectionniste et toujours avec le souci du détail, tout en suivant les avancées technologiques."}
              </p>
            </div>
          </RevealText>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <RevealText delay={0.45}>
              <div className="border-t border-background-300 pt-6">
                <div className="font-heading text-4xl md:text-5xl font-black text-foreground-950">
                  2015
                </div>
                <div className="mt-2 text-sm font-semibold tracking-wider text-foreground-500 uppercase">
                  Année de création
                </div>
              </div>
            </RevealText>

            <RevealText delay={0.55}>
              <div className="border-t border-background-300 pt-6">
                <div className="font-heading text-4xl md:text-5xl font-black text-foreground-950">
                  100<span className="text-primary-500">%</span>
                </div>
                <div className="mt-2 text-sm font-semibold tracking-wider text-foreground-500 uppercase">
                  Expertise Terrain
                </div>
              </div>
            </RevealText>
          </div>

          <RevealText delay={0.65}>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-4 bg-foreground-950 text-white hover:bg-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 group shadow-lg shadow-black/10 hover:shadow-primary-600/30"
            >
              <span>Découvrir nos prestations</span>
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

// Marquee Brands Section Component
function Marquee() {
  const doubledBrands = [
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
  ];
  return (
    <section className="bg-background-50 py-16 md:py-20 border-y border-background-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-center text-xs md:text-sm font-semibold tracking-[0.25em] text-foreground-600 uppercase mb-10">
          La confiance des marques les plus ambitieuses de la République
          Démocratique du Congo
        </p>
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-20 animate-marquee items-center whitespace-nowrap">
            {doubledBrands.map((brand, idx) => (
              <img
                key={`${brand.name}-${idx}`}
                src={brand.src}
                alt={brand.name}
                className="h-10 md:h-14 object-contain transition-transform hover:scale-105 cursor-pointer mix-blend-multiply"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Projects Bento Grid Component
function FeaturedProjects() {
  return (
    <section className="bg-background-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <div>
              <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-600 uppercase mb-4">
                Projets Phares
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground-950">
                Des histoires qui
                <br />
                méritent d'être vécues.
              </h2>
            </div>

            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 text-foreground-950 font-semibold group cursor-pointer whitespace-nowrap"
            >
              <span>Voir tous les projets</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground-950 text-background-50 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                <i className="ri-arrow-right-line"></i>
              </span>
            </Link>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          {/* Layout Masonry sans aucun espace (seamless collage) */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-0 space-y-0 rounded-xl overflow-hidden">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.href}
                className="group relative block overflow-hidden bg-black break-inside-avoid"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Persistent Dark Gradient Overlay for high visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-500 pointer-events-none">
                  {/* Category */}
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-primary-600 text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm shadow-primary-950/20">
                    {project.category}
                  </span>

                  {/* Title - Always visible and highly readable */}
                  <h4 className="text-white text-lg md:text-2xl font-extrabold leading-tight tracking-tight mb-2 font-heading transition-colors duration-300 group-hover:text-primary-300">
                    {project.title}
                  </h4>

                  {/* Expandable summary and link */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:mt-2">
                    <div className="overflow-hidden">
                      <p className="text-neutral-300 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                        {project.summary}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary-400 text-xs md:text-sm font-semibold hover:text-primary-300 transition-colors">
                        Voir le projet{" "}
                        <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

// Zone d'Action Section Component
function ZoneAction() {
  const cities = [
    "Kasangulu",
    "Kisantu",
    "Mbanza – Ngungu",
    "Kimpese",
    "Kwilu - Ngongo",
    "Matadi",
    "Boma",
    "Lukula",
    "Nsioni",
    "Moanda",
    "Luozi"
  ];

  return (
    <section className="bg-background-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-[700px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/impact-event-photo.jpg"
              alt="IMPACT POSITIF sur le terrain"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background-950/60 via-transparent to-transparent"></div>
          </motion.div>
        </div>

        <div className="bg-background-100 flex items-center px-6 md:px-16 py-16 md:py-24">
          <div className="max-w-xl">
            <div>
              <RevealText delay={0.1}>
                <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-600 uppercase mb-6">
                  Notre Zone d'Action
                </span>
              </RevealText>
              <RevealText delay={0.25}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground-950">
                  Opérationnel sur toute l'étendue du <span className="text-primary-600">Kongo Central</span>.
                </h2>
              </RevealText>
            </div>

            <div className="mt-6">
              <RevealText delay={0.2}>
                <p className="text-base md:text-lg text-foreground-700 leading-relaxed">
                  Voici nos principales zones d'intervention :
                </p>
              </RevealText>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {cities.map((city, idx) => (
                <RevealText key={city} delay={0.3 + idx * 0.05}>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span className="text-lg font-bold text-foreground-950">
                      {city}
                    </span>
                  </div>
                </RevealText>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Parlons-en Section Component
function CTA() {
  return (
    <section className="relative overflow-hidden bg-black" id="parlons-en">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
        {/* ── LEFT : Texte ─────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-16 lg:py-20">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-bold tracking-[0.3em] text-red-500 uppercase mb-5"
          >
            Parlons-en
          </motion.span>

          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
          >
            L'expérience
            <br />
            <span className="italic font-light text-red-400">
              commence
              <br />
              maintenant.
            </span>
          </motion.h2>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-white/65 leading-relaxed max-w-md mb-8"
          >
            Vous avez un projet ? Notre équipe est prête à apporter des solutions pertinentes et pointues répondant à vos problématiques de communication et de vente.
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-3 rounded-md transition-all duration-200 shadow-lg shadow-red-700/30 cursor-pointer"
            >
              Contactez-nous <i className="ri-arrow-right-line"></i>
            </Link>
            <a
              href="mailto:hello@impactpositif.com"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-red-500/60 text-white/70 hover:text-white text-sm px-6 py-3 rounded-md transition-all duration-200"
            >
              <i className="ri-mail-line"></i> hello@impactpositif.com
            </a>
          </motion.div>

          {/* Badge localisation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex items-center gap-3 mt-10"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
            <span className="text-xs text-white/40 tracking-widest uppercase">
              Basés à Matadi · Kongo Central · RDC
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT : Carte Afrique ─────────────────────────────── */}
        <div className="relative overflow-hidden flex items-center justify-center min-h-[340px] lg:min-h-0 bg-black">
          {/* Image carte Afrique avec RDC mise en valeur */}
          <img
            src="/africa-map-rdc.png"
            alt="Carte de l'Afrique — République Démocratique du Congo mise en valeur"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ objectPosition: "center center" }}
          />

          {/* Fondu gauche pour raccorder proprement */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none"></div>

          {/* Étoiles animées */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 35 }).map((_, i) => {
              const size = Math.random() * 2.5 + 1;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-red-300"
                  style={{
                    width: size + "px",
                    height: size + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    boxShadow: "0 0 8px 2px rgba(248,113,113,0.55)",
                  }}
                  animate={{
                    opacity: [0.1, 1, 0.1],
                    x: [0, Math.random() * 30 - 15],
                    y: [0, Math.random() * 30 - 15],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                    delay: Math.random() * 3,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ScrollToTop helper component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Services Pillars Data
const pillars = [
  {
    id: "activation-client",
    title: "Activation Client",
    icon: "ri-megaphone-line",
    desc: "Des actions ciblées pour engager directement votre audience et créer une connexion authentique avec votre marque.",
    services: [
      "Communication one to one",
      "Animation / Road Show",
      "Productions médias",
    ],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
    highlight: "Engager votre audience en direct.",
  },
  {
    id: "activation-commerce",
    title: "Activation Commerce",
    icon: "ri-store-2-line",
    desc: "Des stratégies marketing pointues pour dynamiser vos ventes et optimiser votre présence sur le point de vente.",
    services: [
      "Animation Point de Vente (PDV)",
      "Retail audit",
      "Conception publicitaire",
    ],
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1000",
    highlight: "Dynamiser vos points de vente.",
  },
  {
    id: "evenementiel",
    title: "Événementiel",
    icon: "ri-calendar-event-line",
    desc: "Création et gestion globale de vos événements, pour offrir des expériences mémorables et impactantes.",
    services: [
      "Conception événementielle",
      "Événement privé",
      "Événement d'entreprise",
    ],
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
    highlight: "Des événements inoubliables.",
  }
];

// Services Slides Definition
const servicesSlides = [
  {
    id: "intro",
    title: "Nos Services",
    subtitle:
      "IMPACT POSITIF propose une offre complète de services en communication et stratégie marketing adaptée aux besoins de votre entreprise.",
    bgImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600",
    isIntro: true,
  },
  {
    id: "activation-client",
    number: "01",
    title: "Activation Client",
    subtitle:
      "Des actions ciblées pour engager directement votre audience et créer une connexion authentique avec votre marque.",
    bgImage:
      "/images/activation-clients.png",
    capabilities: [
      "Communication one to one",
      "Animation / Road Show",
      "Productions médias",
    ],
  },
  {
    id: "activation-commerce",
    number: "02",
    title: "Activation Commerce",
    subtitle:
      "Des stratégies marketing pointues pour dynamiser vos ventes et optimiser votre présence sur le point de vente.",
    bgImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1600",
    capabilities: [
      "Animation Point de Vente (PDV)",
      "Retail audit",
      "Conception publicitaire",
    ],
  },
  {
    id: "evenementiel",
    number: "03",
    title: "Événementiel",
    subtitle:
      "Création et gestion globale de vos événements, pour offrir des expériences mémorables et impactantes.",
    bgImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600",
    capabilities: [
      "Conception",
      "Événement privé",
      "Événement d'entreprise",
    ],
  },
  {
    id: "contact",
    title: "Prêt à créer un impact ?",
    subtitle:
      "Chez IMPACT POSITIF, nous imaginons, planifions et réalisons des événements qui valorisent votre image, renforcent votre notoriété et créent un impact durable auprès de votre public.",
    bgImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600",
    isFooter: true,
  },
];

// 1. Nos Prestations / What We Do View
function PrestationsView() {
  const [slides, setSlides] = useState<any[]>(servicesSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [globalMenuOpen, setGlobalMenuOpen] = useState(false);
  const [activeCap, setActiveCap] = useState<string | null>(null);
  const isLocked = useRef(false);
  const touchStartRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form submission states for the contact slide
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchServices().then(fetchedServices => {
      if (fetchedServices && fetchedServices.length > 0) {
        const dynamicSlides = fetchedServices.map((s: any, idx: number) => ({
          id: `service-${s.documentId}`,
          number: String(idx + 1).padStart(2, '0'),
          title: s.title,
          subtitle: s.description,
          bgImage: (typeof s.image === 'string' ? s.image : getStrapiMediaUrl(s.image)) || "/images/activation-clients.png",
          capabilities: s.capabilities ? s.capabilities.split(',') : []
        }));
        setSlides([servicesSlides[0], ...dynamicSlides, servicesSlides[servicesSlides.length - 1]]);
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLocked.current) return;

      if (Math.abs(e.deltaY) > 15) {
        isLocked.current = true;
        if (e.deltaY > 0) {
          setCurrentSlide((prev) =>
            Math.min(prev + 1, slides.length - 1),
          );
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
        setTimeout(() => {
          isLocked.current = false;
        }, 950); // matches the transition duration
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        setCurrentSlide((prev) =>
          Math.min(prev + 1, slides.length - 1),
        );
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFormStatus("loading");
    setErrorMessage("");

    try {
      const data = Object.fromEntries(formData.entries());
      const subject = encodeURIComponent(`Nouveau message de contact - ${data.subject || 'Général'}`);
      const body = encodeURIComponent(`Nouveau message depuis le formulaire de contact :
Nom: ${data.name || ''}
Email: ${data.email || ''}
Sujet: ${data.subject || ''}
Message: ${data.message || ''}`);
      
      window.location.href = `mailto:contact@impactpositif.com?subject=${subject}&body=${body}`;
      
      setFormStatus("success");
      form.reset();
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Erreur lors de la préparation de l'email.");
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-screen w-full overflow-hidden bg-background-950 relative select-none"
    >
      {/* Absolute Overlaid Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-5">
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="font-heading font-black text-lg sm:text-xl tracking-tight text-background-50 uppercase z-50"
          >
            <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-12 sm:h-16 w-auto object-contain drop-shadow-md" />
          </Link>

          {/* Central Slide Navigation (desktop only) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 bg-background-950/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-background-50/10">
            {slides
              .filter((s) => !s.isIntro && !s.isFooter)
              .map((slide, idx) => {
                const slideIdx = idx + 1;
                const isActive = currentSlide === slideIdx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(slideIdx)}
                    className={`text-[9px] xl:text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer ${isActive ? "text-primary-400 font-extrabold scale-105" : "text-background-50/60 hover:text-background-50"}`}
                  >
                    {slide.title}
                  </button>
                );
              })}
          </nav>

          <div className="flex items-center gap-4 z-50">
            <Link
              to="/contact"
              className="hidden sm:inline-flex bg-primary-500 hover:bg-primary-600 text-background-50 text-xs font-bold px-4 py-2 rounded transition-colors cursor-pointer"
            >
              Entrer en contact
            </Link>

            <button
              onClick={() => setGlobalMenuOpen(!globalMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 text-background-50 hover:bg-background-50/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <i className="ri-menu-line text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Slide Track */}
      <div
        className="w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;

          // Introduction Slide
          if (slide.isIntro) {
            return (
              <div
                key={slide.id}
                className="w-full h-full relative shrink-0 flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background-950 via-background-950/85 to-background-950/75"></div>
                </div>

                {/* Content */}
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div
                    className={`lg:col-span-7 transition-all duration-1000 delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-400 uppercase mb-4">
                      / Nos Prestations
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tight text-background-50">
                      Ce que nous{" "}
                      <span className="italic font-light text-primary-300">
                        faisons.
                      </span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-background-100/70 max-w-xl leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-background-100/50 font-mono">
                      [ Faites défiler ou cliquez sur un pilier pour explorer ]
                    </p>

                    <div className="mt-12 border-t border-background-50/10 pt-8 max-w-lg">
                      <span className="text-[10px] font-mono text-background-100/40 uppercase tracking-widest block mb-4">
                        Ils nous font confiance
                      </span>
                      <div className="flex gap-6 items-center">
                        <div className="h-12 bg-background-50 rounded-lg px-3 py-1.5 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg">
                          <img
                            src="/images/rawbank.jpeg"
                            alt="Rawbank"
                            className="h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="h-12 bg-background-50 rounded-lg px-3 py-1.5 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg">
                          <img
                            src="/images/illico.jpeg"
                            alt="Illicocash"
                            className="h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="h-12 bg-background-50 rounded-lg px-3 py-1.5 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg">
                          <img
                            src="/images/aurora.jpeg"
                            alt="Aurora RDC"
                            className="h-full object-contain mix-blend-multiply"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pillars Quick Menu (Right Column) */}
                  <div
                    className={`lg:col-span-5 flex flex-col gap-4 transition-all duration-1000 delay-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                  >
                    <span className="text-xs font-mono text-background-100/40 uppercase tracking-widest mb-2 pl-2 border-b border-background-50/10 pb-2">
                      Piliers d'Expertise
                    </span>
                    {slides
                      .filter((s) => !s.isIntro && !s.isFooter)
                      .map((item, menuIdx) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentSlide(menuIdx + 1)}
                          className="flex items-center gap-6 text-left py-2 px-2 transition-all cursor-pointer group hover:translate-x-1 duration-300"
                        >
                          <span className="font-heading font-bold text-lg sm:text-xl text-primary-300 group-hover:text-primary-400 transition-colors">
                            {item.number}
                          </span>
                          <div>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-background-50 group-hover:text-primary-300 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Bottom Bounce Indicator */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() => setCurrentSlide(1)}
                >
                  <span className="text-[10px] font-mono tracking-widest text-background-100/40 uppercase">
                    Explorer
                  </span>
                  <i className="ri-arrow-down-double-line text-primary-400 text-lg animate-bounce"></i>
                </div>
              </div>
            );
          }

          // Contact & Footer Slide
          if (slide.isFooter) {
            return (
              <div
                key={slide.id}
                className="w-full h-full relative shrink-0 flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background-950/90 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-16">
                  {/* Left Column: Coordinates */}
                  <div
                    className={`transition-all duration-1000 delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <span className="inline-block text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3">
                      / Commencer une collaboration
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight text-background-50 mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base text-background-100/65 leading-relaxed mb-8 max-w-md">
                      {slide.subtitle}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-1">
                          EMAIL DIRECT
                        </h4>
                        <a
                          href="mailto:hello@impactpositif.com"
                          className="text-lg sm:text-xl font-bold hover:text-primary-300 text-background-50 transition-colors"
                        >
                          hello@impactpositif.com
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-bold text-xs text-background-50 uppercase tracking-wider">
                            Kinshasa, RDC
                          </h5>
                          <p className="text-xs text-background-100/50 leading-relaxed mt-1">
                            Boulevard du 30 Juin
                            <br />
                            Gombe, Kinshasa
                          </p>
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-background-50 uppercase tracking-wider">
                            Matadi, RDC
                          </h5>
                          <p className="text-xs text-background-100/50 leading-relaxed mt-1">
                            Avenue de la Poste
                            <br />
                            Centre-Ville, Matadi
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini Contact Form */}
                  <div
                    className={`bg-background-900/80 border border-background-50/10 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-1000 delay-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  >
                    <h3 className="text-base sm:text-lg font-heading font-bold mb-4 text-background-50">
                      Envoyer un message rapide
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Nom Complet"
                          className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Adresse Email"
                          className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all"
                        />
                      </div>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="Racontez-nous brièvement votre projet..."
                        className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all resize-none"
                      ></textarea>

                      {/* Honeypot field */}
                      <div style={{ display: "none" }} aria-hidden="true">
                        <label htmlFor="website_alt_services">
                          Merci de laisser ce champ vide
                        </label>
                        <input
                          id="website_alt_services"
                          type="text"
                          name="website_alt"
                          tabIndex={-1}
                          autoComplete="off"
                          readOnly
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 font-bold py-3 px-4 rounded text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        {formStatus === "loading"
                          ? "Transmission…"
                          : "Envoyer le message"}
                      </button>

                      {formStatus === "success" && (
                        <p className="text-xs text-primary-300 bg-primary-500/10 border border-primary-500/30 p-2.5 rounded">
                          Message envoyé avec succès ! Nous vous recontactons
                          sous 24h.
                        </p>
                      )}
                      {formStatus === "error" && (
                        <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 p-2.5 rounded">
                          {errorMessage}
                        </p>
                      )}
                    </form>

                    {/* Bottom Micro Footer Copyright */}
                    <div className="mt-6 pt-4 border-t border-background-50/5 flex flex-wrap justify-between items-center text-[10px] text-background-100/30 font-mono gap-2">
                      <span>© 2026 IMPACT POSITIF</span>
                      <div className="flex gap-3">
                        <Link
                          to="/privacy-policy"
                          className="hover:text-primary-400"
                        >
                          Confidentialité
                        </Link>
                        <button
                          onClick={() => setCurrentSlide(0)}
                          className="hover:text-primary-400"
                        >
                          Retour haut
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Service Pillars Slides (1 to 5)
          return (
            <div
              key={slide.id}
              className="w-full h-full relative shrink-0 flex items-center"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background-950/75 md:bg-background-950/70 backdrop-blur-[1px]"></div>
              </div>

              {/* Grid content */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left Side: Number, Title, Subtitle */}
                <div
                  className={`lg:col-span-6 transition-all duration-1000 delay-200 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                  {/* Big Index (no borders/bg, just text) */}
                  <div className="text-primary-300 text-4xl sm:text-5xl font-black font-heading mb-4 leading-none">
                    {slide.number}
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-background-50 mb-4 font-heading leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-background-100/85 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Right Side: Specific Capabilities List (Scroll To Slide UI Style) */}
                <div
                  className={`lg:col-span-6 transition-all duration-1000 delay-400 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                >
                  <div className="bg-background-900/50 backdrop-blur-md border border-background-50/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
                    <span className="block text-[10px] font-mono text-background-100/40 uppercase tracking-widest mb-6 border-b border-background-50/10 pb-2">
                      SAVOIR-FAIRE CLÉS / CAPABILITIES
                    </span>
                    <ul className="space-y-4">
                      {slide.capabilities?.map((cap, capIdx) => {
                        const isSelected =
                          activeCap === cap || (!activeCap && capIdx === 1);
                        return (
                          <li
                            key={capIdx}
                            onMouseEnter={() => setActiveCap(cap)}
                            onMouseLeave={() => setActiveCap(null)}
                            className={`text-sm sm:text-base md:text-lg font-bold transition-all cursor-pointer flex items-center gap-3 pl-3 py-1 border-l-2 ${isSelected ? "text-primary-300 border-primary-500 translate-x-1.5" : "text-background-100/50 border-transparent hover:text-background-50 hover:border-background-50/30"}`}
                          >
                            <i
                              className={`ri-play-fill text-xs transition-opacity duration-300 ${isSelected ? "opacity-100 text-primary-400" : "opacity-0"}`}
                            ></i>
                            <span>{cap}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Bounce Indicator to go to next slide */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => setCurrentSlide(idx + 1)}
              >
                <span className="text-[10px] font-mono tracking-widest text-background-100/40 uppercase">
                  Suivant
                </span>
                <i className="ri-arrow-down-s-line text-primary-400 text-base animate-bounce"></i>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Drawer Menu */}
      {globalMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background-950 flex flex-col justify-between pt-24 px-8 pb-8 overflow-y-auto animate-fade-in">
          {/* Close button inside drawer */}
          <button
            onClick={() => setGlobalMenuOpen(false)}
            className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 text-background-50 hover:bg-background-50/10 cursor-pointer"
            aria-label="Fermer le menu"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Logo inside Drawer */}
          <div className="mb-4">
            <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 sm:gap-6 my-auto">
            {[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/our-work" },
              { label: "Services", href: "/solutions" },
              { label: "Nos prestations", href: "/what-we-do" },
              { label: "Qui sommes-nous", href: "/who-we-are" },
              { label: "IMPACT Feed", href: "/impact-feed" },
              { label: "Carrières", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setGlobalMenuOpen(false)}
                className="text-background-50 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading hover:text-primary-400 transition-all border-b border-background-50/5 pb-2 inline-block hover:translate-x-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Details at bottom of Drawer */}
          <div className="pt-6 border-t border-background-50/10 flex flex-wrap justify-between items-center text-xs text-background-100/40 font-mono gap-4">
            <span>hello@impactpositif.com</span>
            <span>Gombe, Kinshasa • Matadi</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Projects Slides Definition
const projectsSlides = [
  {
    id: "intro",
    title: "Nos Réalisations",
    subtitle:
      "Nous connectons les marques et les publics mondiaux à travers des activations mémorables, des scénographies audacieuses et des technologies événementielles de pointe.",
    bgImage: "/images/MTS_7257.JPG",
    isIntro: true,
  },
  {
    id: "forum-eco-2025",
    number: "01",
    title: "Forum Économique de Kinshasa 2025",
    category: "Sommet d'Affaires",
    subtitle:
      "Conception et production intégrale du sommet annuel au Centre Financier de Kinshasa. Scénographie immersive, keynote stage LED 360° et expériences networking interactives.",
    bgImage: "/images/forum.jpg",
    details: [
      "Direction artistique & Concept",
      "Scénographie 360° LED",
      "Régie générale & Technique de pointe",
      "Production de contenu & Motion design",
      "5 000 leaders sur site",
    ],
    href: "/case-studies/forum-eco-2025",
  },
  {
    id: "finance-africaine",
    number: "02",
    title: "Sommet de la Finance Africaine",
    category: "Conférence Financière",
    subtitle:
      "Activation premium pour la Rawbank sur le plus grand événement financier de la RDC. Pavillon interactif de 800 m² avec démonstrations en direct et espace VIP d'exception.",
    bgImage: "/images/PAGE.jpg",
    details: [
      "Pavillon interactif de 800 m²",
      "Scénographie & Conception technique",
      "Sourcing technologique & Négociation",
      "Production de contenu de marque",
      "Espaces de rencontre stratégiques B2B",
    ],
    href: "/case-studies/finance-africaine",
  },
  {
    id: "rdc-tech-expo",
    number: "03",
    title: "RDC Tech Innovation Expo",
    category: "Activation de Marque",
    subtitle:
      "Tournée technologique majeure à travers 5 grandes villes de la RDC pour présenter les innovations numériques. Scénographie modulaire, dômes interactifs et expériences connectées.",
    bgImage: "/images/rdc_tech.jpg",
    details: [
      "Activation itinérante dans 5 villes",
      "Structures scénographiques modulaires",
      "Dômes d'immersion 3D interactifs",
      "Stands d'expérimentation en direct",
      "Logistique & Sécurité régionales",
    ],
    href: "/case-studies/rdc-tech-expo",
  },
  {
    id: "investisseurs-miniers",
    number: "04",
    title: "Symposium des Investisseurs Miniers",
    category: "Sommet Stratégique",
    subtitle:
      "Forum de haut niveau réunissant des délégations internationales à Kolwezi. Direction artistique d'une élégance rare, sécurité présidentielle et pavillons d'exposition haut de gamme.",
    bgImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1600",
    bgVideo: "/videos/MTS_SANS_MARK.mp4",
    details: [
      "Scénographie VIP d'inspiration locale",
      "Protocole de sécurité strict",
      "Service traiteur haut de gamme",
      "Keynote technique ultra HD",
      "300 délégations d'investisseurs",
    ],
    href: "/case-studies/investisseurs-miniers",
  },
  {
    id: "contact",
    title: "Prêt à créer un impact ?",
    subtitle:
      "Racontez-nous brièvement votre projet, nos experts en stratégie, création et production événementielle sont là pour vous.",
    bgImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600",
    isFooter: true,
  },
];

// 2. Nos Réalisations / Our Work View
function RealisationsView() {
  const [slides, setSlides] = useState<any[]>(projectsSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [globalMenuOpen, setGlobalMenuOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const isLocked = useRef(false);
  const touchStartRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form submission states for the contact slide
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRealizations().then(fetched => {
      if (fetched && fetched.length > 0) {
        const dynamicSlides = fetched.map((r: any, idx: number) => ({
          id: r.id || `realization-${idx}`,
          number: String(idx + 1).padStart(2, '0'),
          title: r.title,
          category: r.category || "Projet",
          subtitle: r.summary,
          bgImage: (typeof r.image === 'string' ? r.image : getStrapiMediaUrl(r.image)) || "/images/forum.jpg",
          location: r.location,
          details: r.details ? r.details.split(',') : ["Direction artistique", "Scénographie", "Production de contenu"],
          href: `/case-studies/${r.id}`
        }));
        setSlides([projectsSlides[0], ...dynamicSlides, projectsSlides[projectsSlides.length - 1]]);
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLocked.current) return;

      if (Math.abs(e.deltaY) > 15) {
        isLocked.current = true;
        if (e.deltaY > 0) {
          setCurrentSlide((prev) =>
            Math.min(prev + 1, slides.length - 1),
          );
        } else {
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
        }
        setTimeout(() => {
          isLocked.current = false;
        }, 950); // matches the transition duration
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffY = touchStartRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        setCurrentSlide((prev) =>
          Math.min(prev + 1, slides.length - 1),
        );
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot field
    if (String(formData.get("website_alt") || "").trim()) {
      setFormStatus("success");
      form.reset();
      return;
    }

    formData.delete("website_alt");
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const formUrl = "https://readdy.ai/api/form/d93fc3tmi650so75dql0";
      const searchParams = new URLSearchParams();
      formData.forEach((val, key) => {
        searchParams.append(key, String(val));
      });

      const response = await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });

      const responseText = await response.text();
      let responseJson: any = {};
      try {
        responseJson = JSON.parse(responseText);
      } catch (err) {}

      const msg =
        responseJson?.meta?.message ||
        responseJson?.meta?.detail ||
        responseText;
      const isSpam = typeof msg === "string" && /spam/i.test(msg);

      if (response.ok && responseJson?.code === "OK" && !isSpam) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        setErrorMessage(msg || "Échec de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-screen w-full overflow-hidden bg-background-950 relative select-none"
    >
      {/* Absolute Overlaid Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-5">
        <div className="w-full px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="font-heading font-black text-lg sm:text-xl tracking-tight text-background-50 uppercase z-50"
          >
            <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-12 sm:h-16 w-auto object-contain drop-shadow-md" />
          </Link>

          {/* Central Slide Navigation (desktop only) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 bg-background-950/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-background-50/10">
            {slides
              .filter((s) => !s.isIntro && !s.isFooter)
              .map((slide, idx) => {
                const slideIdx = idx + 1;
                const isActive = currentSlide === slideIdx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(slideIdx)}
                    className={`text-[9px] xl:text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer ${isActive ? "text-primary-400 font-extrabold scale-105" : "text-background-50/60 hover:text-background-50"}`}
                  >
                    {slide.title}
                  </button>
                );
              })}
          </nav>

          <div className="flex items-center gap-4 z-50">
            <Link
              to="/contact"
              className="hidden sm:inline-flex bg-primary-500 hover:bg-primary-600 text-background-50 text-xs font-bold px-4 py-2 rounded transition-colors cursor-pointer"
            >
              Entrer en contact
            </Link>

            <button
              onClick={() => setGlobalMenuOpen(!globalMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 text-background-50 hover:bg-background-50/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <i className="ri-menu-line text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Slide Track */}
      <div
        className="w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;

          // Introduction Slide
          if (slide.isIntro) {
            return (
              <div
                key={slide.id}
                className="w-full h-full relative shrink-0 flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-red-800/10 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-background-950/95 via-background-950/60 to-red-900/10"></div>
                </div>

                {/* Content */}
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div
                    className={`lg:col-span-7 transition-all duration-1000 delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-400 uppercase mb-4">
                      / Portfolio d'Activations
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tight text-background-50">
                      Nos{" "}
                      <span className="italic font-light text-primary-300">
                        réalisations.
                      </span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-background-100/70 max-w-xl leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <p className="mt-4 text-xs sm:text-sm text-background-100/50 font-mono">
                      [ Faites défiler ou cliquez sur un projet pour l'étudier ]
                    </p>
                  </div>

                  {/* Projects Quick Menu (Right Column) */}
                  <div
                    className={`lg:col-span-5 flex flex-col gap-4 transition-all duration-1000 delay-500 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                  >
                    <span className="text-xs font-mono text-background-100/40 uppercase tracking-widest mb-2 pl-2 border-b border-background-50/10 pb-2">
                      Projets Clés
                    </span>
                    {slides
                      .filter((s) => !s.isIntro && !s.isFooter)
                      .map((item, menuIdx) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentSlide(menuIdx + 1)}
                          className="flex items-center gap-6 text-left py-2 px-2 transition-all cursor-pointer group hover:translate-x-1 duration-300"
                        >
                          <span className="font-heading font-bold text-lg sm:text-xl text-primary-300 group-hover:text-primary-400 transition-colors">
                            {item.number}
                          </span>
                          <div>
                            <span className="text-[9px] font-mono tracking-widest text-primary-400 uppercase font-semibold block mb-0.5">
                              {item.category}
                            </span>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-background-50 group-hover:text-primary-300 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Bottom Bounce Indicator */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() => setCurrentSlide(1)}
                >
                  <span className="text-[10px] font-mono tracking-widest text-background-100/40 uppercase">
                    Explorer
                  </span>
                  <i className="ri-arrow-down-double-line text-primary-400 text-lg animate-bounce"></i>
                </div>
              </div>
            );
          }

          // Contact & Footer Slide
          if (slide.isFooter) {
            return (
              <div
                key={slide.id}
                className="w-full h-full relative shrink-0 flex items-center"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background-950/90 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-16">
                  {/* Left Column: Coordinates */}
                  <div
                    className={`transition-all duration-1000 delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <span className="inline-block text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3">
                      / Commencer une collaboration
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight text-background-50 mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base text-background-100/65 leading-relaxed mb-8 max-w-md">
                      {slide.subtitle}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-1">
                          EMAIL DIRECT
                        </h4>
                        <a
                          href="mailto:hello@impactpositif.com"
                          className="text-lg sm:text-xl font-bold hover:text-primary-300 text-background-50 transition-colors"
                        >
                          hello@impactpositif.com
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-bold text-xs text-background-50 uppercase tracking-wider">
                            Kinshasa, RDC
                          </h5>
                          <p className="text-xs text-background-100/50 leading-relaxed mt-1">
                            Boulevard du 30 Juin
                            <br />
                            Gombe, Kinshasa
                          </p>
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-background-50 uppercase tracking-wider">
                            Matadi, RDC
                          </h5>
                          <p className="text-xs text-background-100/50 leading-relaxed mt-1">
                            Avenue de la Poste
                            <br />
                            Centre-Ville, Matadi
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini Contact Form */}
                  <div
                    className={`bg-background-900/80 border border-background-50/10 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-1000 delay-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  >
                    <h3 className="text-base sm:text-lg font-heading font-bold mb-4 text-background-50">
                      Envoyer un message rapide
                    </h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Nom Complet"
                          className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Adresse Email"
                          className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all"
                        />
                      </div>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="Racontez-nous brièvement votre projet..."
                        className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/30 rounded px-4 py-2.5 text-xs sm:text-sm transition-all resize-none"
                      ></textarea>

                      {/* Honeypot field */}
                      <div style={{ display: "none" }} aria-hidden="true">
                        <label htmlFor="website_alt_projects">
                          Merci de laisser ce champ vide
                        </label>
                        <input
                          id="website_alt_projects"
                          type="text"
                          name="website_alt"
                          tabIndex={-1}
                          autoComplete="off"
                          readOnly
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 font-bold py-3 px-4 rounded text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        {formStatus === "loading"
                          ? "Transmission…"
                          : "Envoyer le message"}
                      </button>

                      {formStatus === "success" && (
                        <p className="text-xs text-primary-300 bg-primary-500/10 border border-primary-500/30 p-2.5 rounded">
                          Message envoyé avec succès ! Nous vous recontactons
                          sous 24h.
                        </p>
                      )}
                      {formStatus === "error" && (
                        <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 p-2.5 rounded">
                          {errorMessage}
                        </p>
                      )}
                    </form>

                    {/* Bottom Micro Footer Copyright */}
                    <div className="mt-6 pt-4 border-t border-background-50/5 flex flex-wrap justify-between items-center text-[10px] text-background-100/30 font-mono gap-2">
                      <span>© 2026 IMPACT POSITIF</span>
                      <div className="flex gap-3">
                        <Link
                          to="/privacy-policy"
                          className="hover:text-primary-400"
                        >
                          Confidentialité
                        </Link>
                        <button
                          onClick={() => setCurrentSlide(0)}
                          className="hover:text-primary-400"
                        >
                          Retour haut
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Case Study Slides (1 to 5)
          return (
            <div
              key={slide.id}
              className="w-full h-full relative shrink-0 flex items-center"
            >
              {/* Background Image / Video */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                {/* @ts-ignore */}
                {slide.bgVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover blur-[1px] scale-105"
                  >
                    {/* @ts-ignore */}
                    <source src={slide.bgVideo} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={slide.bgImage}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-red-800/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background-950/95 via-background-950/60 to-red-900/10"></div>
              </div>

              {/* Grid content */}
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Left Side: Category, Title, Subtitle */}
                <div
                  className={`lg:col-span-6 transition-all duration-1000 delay-200 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                  {/* Category Tag */}
                  <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-primary-500/30">
                    {slide.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-background-50 mb-4 font-heading leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-background-100/85 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Right Side: Deliverables / Specs */}
                <div
                  className={`lg:col-span-6 transition-all duration-1000 delay-400 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                >
                  <div className="bg-background-900/50 backdrop-blur-md border border-background-50/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
                    <span className="block text-[10px] font-mono text-background-100/40 uppercase tracking-widest mb-6 border-b border-background-50/10 pb-2">
                      LIVRABLES CLÉS & CHIFFRES
                    </span>
                    <ul className="space-y-4">
                      {slide.details?.map((detail, detIdx) => {
                        const isSelected =
                          activeDetail === detail ||
                          (!activeDetail && detIdx === 0);
                        return (
                          <li
                            key={detIdx}
                            onMouseEnter={() => setActiveDetail(detail)}
                            onMouseLeave={() => setActiveDetail(null)}
                            className={`text-sm sm:text-base md:text-lg font-bold transition-all cursor-pointer flex items-center gap-3 pl-3 py-1 border-l-2 ${isSelected ? "text-primary-300 border-primary-500 translate-x-1.5" : "text-background-100/50 border-transparent hover:text-background-50 hover:border-background-50/30"}`}
                          >
                            <i
                              className={`ri-play-fill text-xs transition-opacity duration-300 ${isSelected ? "opacity-100 text-primary-400" : "opacity-0"}`}
                            ></i>
                            <span>{detail}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Bounce Indicator to go to next slide */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => setCurrentSlide(idx + 1)}
              >
                <span className="text-[10px] font-mono tracking-widest text-background-100/40 uppercase">
                  Suivant
                </span>
                <i className="ri-arrow-down-s-line text-primary-400 text-base animate-bounce"></i>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Drawer Menu */}
      {globalMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background-950 flex flex-col justify-between pt-24 px-8 pb-8 overflow-y-auto animate-fade-in">
          {/* Close button inside drawer */}
          <button
            onClick={() => setGlobalMenuOpen(false)}
            className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center rounded-full border border-background-50/20 text-background-50 hover:bg-background-50/10 cursor-pointer"
            aria-label="Fermer le menu"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Logo inside Drawer */}
          <div className="mb-4">
            <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 sm:gap-6 my-auto">
            {[
              { label: "Accueil", href: "/" },
              { label: "Réalisations", href: "/our-work" },
              { label: "Services", href: "/solutions" },
              { label: "Nos prestations", href: "/what-we-do" },
              { label: "Qui sommes-nous", href: "/who-we-are" },
              { label: "IMPACT Feed", href: "/impact-feed" },
              { label: "Carrières", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setGlobalMenuOpen(false)}
                className="text-background-50 text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading hover:text-primary-400 transition-all border-b border-background-50/5 pb-2 inline-block hover:translate-x-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Details at bottom of Drawer */}
          <div className="pt-6 border-t border-background-50/10 flex flex-wrap justify-between items-center text-xs text-background-100/40 font-mono gap-4">
            <span>hello@impactpositif.com</span>
            <span>Gombe, Kinshasa • Matadi</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. Contact View
function ContactView() {
  const [locationData, setLocationData] = useState<any>(null);
  const [globalData, setGlobalData] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLocation().then(data => {
      if (data) setLocationData(data);
    });
    fetchGlobal().then(data => {
      if (data) setGlobalData(data);
    });
  }, []);

  const contactImageUrl = getStrapiMediaUrl(globalData?.contactImage) || '/images/forum.jpg';

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot field
    if (String(formData.get("website_alt") || "").trim()) {
      setFormStatus("success");
      form.reset();
      return;
    }

    formData.delete("website_alt");
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const data = Object.fromEntries(formData.entries());
      await submitMessage(data);

      setFormStatus("success");
      form.reset();
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="min-h-screen bg-background-950 text-background-50">
      <Header />

      <section className="relative overflow-hidden pt-28 pb-12 md:pt-48 md:pb-24 border-b border-background-50/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-400 uppercase mb-4 animate-fade-in">
            / Entrer en Contact
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.05] tracking-tight text-background-50 max-w-4xl">
            Parlons de votre{" "}
            <span className="italic font-light text-primary-300">projet.</span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Image + Details Column */}
          <div>
            {/* Dynamic Contact Image from Strapi */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-10 shadow-2xl">
              <img src={contactImageUrl} alt="IMPACT POSITIF Contact" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-950/70 via-transparent to-transparent" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-6">
              Prêt à relever votre prochain défi ?
            </h3>
            <p className="text-background-100/70 text-base leading-relaxed mb-10 max-w-lg">
              Que vous ayez un brief complet rédigé, une simple idée de projet,
              ou que vous souhaitiez explorer nos services en détail, notre
              équipe de direction et d'ingénierie événementielle se tient à
              votre entière disposition.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-3">
                  Pour toute demande par email
                </h4>
                <a
                  href={`mailto:${globalData?.contactEmail || "contact@impactpositif.com"}`}
                  className="text-xl md:text-2xl font-bold hover:text-primary-300 transition-colors"
                >
                  {globalData?.contactEmail || "contact@impactpositif.com"}
                </a>
              </div>

              <div>
                <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-3">
                  Par téléphone
                </h4>
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${(globalData?.contactPhone1 || "+243818897000").replace(/\s/g, '')}`}
                    className="text-xl md:text-2xl font-bold hover:text-primary-300 transition-colors"
                  >
                    {globalData?.contactPhone1 || "+243 81 889 7000"}
                  </a>
                  <a
                    href={`tel:${(globalData?.contactPhone2 || "+243858493102").replace(/\s/g, '')}`}
                    className="text-xl md:text-2xl font-bold hover:text-primary-300 transition-colors"
                  >
                    {globalData?.contactPhone2 || "+243 85 84 93 102"}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4">
                  Nos implantations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-background-50">Kinshasa</h5>
                    <p className="text-sm text-background-100/60 mt-1 leading-relaxed">
                      Boulevard du 30 Juin
                      <br />
                      Gombe, Kinshasa, RDC
                    </p>
                  </div>
                  <div>
                    <h5 className="font-bold text-background-50">{locationData?.city || "MATADI"}</h5>
                    <p className="text-sm text-background-100/60 mt-1 leading-relaxed">
                      Avenue Masunda Manoki 11 / Ville Haute
                      <br />
                      +243 818 897 000 - 850 849 310
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-background-900 border border-background-50/10 rounded-xl p-6 md:p-10 shadow-2xl">
            <h3 className="text-xl font-heading font-bold mb-6">
              Envoyez-nous un message
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="name"
                  >
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Jean Dupont"
                    className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3 text-sm transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="email"
                  >
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jean.dupont@company.com"
                    className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                  htmlFor="subject"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Opportunité de projet événementiel"
                  className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3 text-sm transition-all"
                />
              </div>

              <div>
                <label
                  className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                  htmlFor="message"
                >
                  Votre Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Racontez-nous brièvement votre projet, vos objectifs et votre calendrier..."
                  className="w-full bg-background-950 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3 text-sm transition-all resize-none"
                ></textarea>
              </div>

              {/* Honeypot field */}
              <div className="hp-field-shell" aria-hidden="true">
                <label htmlFor="website_alt_contact">
                  Merci de laisser ce champ vide
                </label>
                <input
                  id="website_alt_contact"
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  readOnly
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 font-semibold px-6 py-4 rounded transition-colors cursor-pointer disabled:opacity-70"
              >
                {formStatus === "loading"
                  ? "Transmission en cours…"
                  : "Envoyer le message"}
                {formStatus !== "loading" && (
                  <i className="ri-send-plane-fill text-sm"></i>
                )}
              </button>

              {formStatus === "success" && (
                <div className="p-4 rounded bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-line text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-bold">Message envoyé avec succès !</p>
                    <p className="text-xs mt-0.5 text-primary-300/85">
                      Merci pour votre intérêt. Notre équipe commerciale vous
                      répondra sous 24 à 48 heures.
                    </p>
                  </div>
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-4 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2.5">
                  <i className="ri-error-warning-line text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-bold">Erreur de transmission</p>
                    <p className="text-xs mt-0.5 text-red-300/85">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- PARTENAIRES VIEW ---
const PARTNERS_DATA = [
  {
    id: "rawbank",
    name: "Rawbank",
    industry: "Banque & Finance",
    logoImg: "/images/rawbank.jpeg",
    icon: "ri-bank-line",
    color: "#ecb22f",
    glowColor: "rgba(236, 178, 47, 0.45)",
    textAccent: "text-[#ecb22f]",
    bgAccent: "bg-[#ecb22f]/10",
    borderAccent: "border-[#ecb22f]/20",
    shadowClass: "shadow-[0_0_20px_rgba(236,178,47,0.35)]",
    pulseClass: "shadow-[0_0_35px_rgba(236,178,47,0.5)]",
    description:
      "Institution financière majeure en RDC depuis 2002. Pionnière de l'inclusion financière avec ses services innovants, elle offre des solutions sur mesure aux particuliers et aux entreprises.",
    keyMetric: "1ère",
    keyMetricLabel: "Banque de RDC",
    quote:
      "IMPACT POSITIF a su concevoir des expériences événementielles qui reflètent parfaitement notre positionnement de leader et notre vision d'innovation continue.",
    quoteAuthor: "Direction Communication, Rawbank",
  },
  {
    id: "illicocash",
    name: "Illicocash",
    industry: "Fintech & Mobile Money",
    logoImg: "/images/illico.jpeg",
    icon: "ri-smartphone-line",
    color: "#e20613",
    glowColor: "rgba(226, 6, 19, 0.45)",
    textAccent: "text-[#e20613]",
    bgAccent: "bg-[#e20613]/10",
    borderAccent: "border-[#e20613]/20",
    shadowClass: "shadow-[0_0_20px_rgba(226,6,19,0.35)]",
    pulseClass: "shadow-[0_0_35px_rgba(226,6,19,0.5)]",
    description:
      "La solution mobile money incontournable en RDC développée par Rawbank. Une plateforme numérique révolutionnant les paiements et facilitant l'inclusion financière via smartphone.",
    keyMetric: "100%",
    keyMetricLabel: "Digital & Mobile",
    quote:
      "Nos activations de marque avec IMPACT POSITIF ont propulsé l'adoption de notre application de manière phénoménale auprès du grand public.",
    quoteAuthor: "Marketing Manager, Illicocash",
  },
  {
    id: "aurorardc",
    name: "Aurora RDC",
    industry: "Technologie & Solutions Numériques",
    logoImg: "/images/aurora.jpeg",
    icon: "ri-computer-line",
    color: "#005a9c",
    glowColor: "rgba(0, 90, 156, 0.45)",
    textAccent: "text-[#005a9c]",
    bgAccent: "bg-[#005a9c]/10",
    borderAccent: "border-[#005a9c]/20",
    shadowClass: "shadow-[0_0_20px_rgba(0,90,156,0.35)]",
    pulseClass: "shadow-[0_0_35px_rgba(0,90,156,0.5)]",
    description:
      "Start-up technologique innovante experte en développement de solutions digitales, intelligentes et interactives pour accompagner la transformation numérique des entreprises.",
    keyMetric: "Tech",
    keyMetricLabel: "Innovation Digitale",
    quote:
      "La synergie entre nos solutions technologiques et la créativité scénographique d'IMPACT POSITIF crée des événements d'une interactivité sans précédent.",
    quoteAuthor: "Direction, Aurora RDC",
  },
];

function PartenairesView() {
  const [selectedPartner, setSelectedPartner] = useState(PARTNERS_DATA[0]);
  const [hoveredPartnerId, setHoveredPartnerId] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePartnerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website_alt") || "").trim()) {
      setFormStatus("success");
      form.reset();
      return;
    }

    formData.delete("website_alt");
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const formUrl = "https://readdy.ai/api/form/d93fc3tmi650so75dql0";
      const searchParams = new URLSearchParams();
      formData.forEach((val, key) => {
        searchParams.append(key, String(val));
      });

      const response = await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams.toString(),
      });

      const responseText = await response.text();
      let responseJson: any = {};
      try {
        responseJson = JSON.parse(responseText);
      } catch (err) {}

      const msg =
        responseJson?.meta?.message ||
        responseJson?.meta?.detail ||
        responseText;
      const isSpam = typeof msg === "string" && /spam/i.test(msg);

      if (response.ok && responseJson?.code === "OK" && !isSpam) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        setErrorMessage(
          msg || "Échec de l'envoi de la demande. Veuillez réessayer.",
        );
      }
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    }
  };

  const carouselItems = [...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <div className="min-h-screen bg-background-950 text-background-100 flex flex-col selection:bg-primary-500 selection:text-background-50">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative pt-20 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-background-50/10">
        <div className="absolute inset-0 bg-radial-gradient from-primary-500/5 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <span className="text-xs font-mono text-primary-400 uppercase tracking-[0.25em] block mb-3 text-center">
            Notre Écosystème Global
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-background-50 tracking-tight text-center max-w-4xl mx-auto leading-none">
            Un Rayonnement de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-amber-300">
              Marques Visionnaires
            </span>
          </h1>
          <p className="mt-6 text-background-100/70 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto leading-relaxed">
            Nous collaborons avec les leaders mondiaux de l'industrie pour
            concevoir des expériences physiques et digitales mémorables.
            Ensemble, nous donnons vie au futur de l'engagement.
          </p>

          {/* Key Ecosystem Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16 max-w-5xl mx-auto border-t border-background-50/10 pt-10">
            {[
              { num: "15+", label: "Leaders Mondiaux" },
              { num: "120+", label: "Activations Réalisées" },
              { num: "99%", label: "Taux de Fidélité" },
              { num: "100%", label: "Synergie Créative" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-3xl md:text-4xl font-black font-heading text-primary-300 leading-none mb-1">
                  {stat.num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-background-100/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Glowing Carousel */}
      <section className="py-12 md:py-20 bg-background-900/30 overflow-hidden relative border-b border-background-50/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-background-50 tracking-tight">
                Le Carrousel Rayonnant
              </h2>
              <p className="text-sm text-background-100/60 mt-1 max-w-md">
                Explorez notre constellation de partenaires. Survolez pour
                suspendre le défilement et faire briller le logo de votre choix.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary-400 uppercase tracking-widest bg-background-950 border border-background-50/15 py-1.5 px-3.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping"></span>
              Défilement actif
            </div>
          </div>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative w-full overflow-hidden py-10 bg-background-950/40 border-y border-background-50/5">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background-950 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {carouselItems.map((partner, idx) => {
              const isHovered = hoveredPartnerId === `${partner.id}-${idx}`;
              const isSelected = selectedPartner.id === partner.id;

              return (
                <div
                  key={`${partner.id}-${idx}`}
                  onMouseEnter={() =>
                    setHoveredPartnerId(`${partner.id}-${idx}`)
                  }
                  onMouseLeave={() => setHoveredPartnerId(null)}
                  onClick={() => setSelectedPartner(partner)}
                  className="inline-block relative cursor-pointer select-none group focus:outline-none py-2 px-1"
                >
                  {/* Glowing background aura (RAYONNANT) */}
                  <div
                    className="absolute inset-0 rounded-xl transition-all duration-700 blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-110 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${partner.glowColor} 0%, transparent 65%)`,
                    }}
                  />

                  {/* Logo Card Panel */}
                  <div
                    className={`relative flex items-center justify-center gap-3 w-48 h-20 px-6 rounded-xl border bg-background-950/80 backdrop-blur-sm transition-all duration-500 ${
                      isSelected
                        ? "border-primary-500/50 shadow-[0_0_25px_rgba(255,100,50,0.25)]"
                        : isHovered
                          ? "border-background-50/30"
                          : "border-background-50/10"
                    }`}
                  >
                    <span
                      className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        isHovered || isSelected ? "scale-125" : "opacity-40"
                      }`}
                      style={{ backgroundColor: partner.color }}
                    />
                    {partner.logoImg ? (
                      <img
                        src={partner.logoImg}
                        alt={partner.name}
                        className={`w-10 h-10 object-contain transition-all duration-500 mix-blend-multiply ${
                          isHovered || isSelected
                            ? "scale-110 grayscale-0 opacity-100"
                            : "grayscale opacity-70"
                        }`}
                      />
                    ) : (
                      <i
                        className={`${partner.icon} text-2xl transition-all duration-500 ${
                          isHovered || isSelected
                            ? "scale-110"
                            : "text-background-100/50"
                        }`}
                        style={{
                          color:
                            isHovered || isSelected ? partner.color : undefined,
                        }}
                      />
                    )}

                    <span
                      className={`font-heading font-bold text-base transition-all duration-500 ${
                        isHovered || isSelected
                          ? "text-background-50 tracking-normal"
                          : "text-background-100/50"
                      }`}
                    >
                      {partner.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Detail Showroom */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="absolute -top-1/4 -left-1/4 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Selector List */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="text-xs font-mono text-primary-400 uppercase tracking-widest pl-2 mb-4 border-b border-background-50/10 pb-2">
              Index des Partenaires
            </span>

            <div className="flex flex-col gap-2">
              {PARTNERS_DATA.map((partner) => {
                const isActive = selectedPartner.id === partner.id;
                return (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedPartner(partner)}
                    className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? "bg-background-900 border-primary-500/30 shadow-lg"
                        : "bg-background-950/40 border-background-50/5 hover:border-background-50/20 hover:bg-background-900/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg transition-colors border ${
                          isActive
                            ? "border-primary-500/20 text-background-50"
                            : "border-background-50/10 text-background-100/40 group-hover:text-background-50"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? `${partner.color}15`
                            : undefined,
                        }}
                      >
                        {partner.logoImg ? (
                          <img
                            src={partner.logoImg}
                            alt={partner.name}
                            className="w-8 h-8 object-contain mix-blend-multiply"
                          />
                        ) : (
                          <i
                            className={`${partner.icon} text-lg`}
                            style={{
                              color: isActive ? partner.color : undefined,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-background-50">
                          {partner.name}
                        </h4>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-background-100/40">
                          {partner.industry}
                        </span>
                      </div>
                    </div>

                    <i
                      className={`ri-arrow-right-line text-sm transition-all duration-300 ${
                        isActive
                          ? "text-primary-400 translate-x-1"
                          : "text-background-100/20 group-hover:text-background-50/80 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detail Showcase Pane */}
          <div className="lg:col-span-8 flex flex-col h-full justify-between">
            <div className="relative h-full flex flex-col p-8 sm:p-10 rounded-2xl border border-background-50/10 bg-background-900/40 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="absolute -bottom-10 -right-10 text-[12rem] text-background-50/[0.02] pointer-events-none select-none z-0">
                <i className={selectedPartner.icon} />
              </div>

              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none z-0 transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${selectedPartner.color} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 flex items-center justify-center overflow-hidden rounded-xl border shadow-lg"
                        style={{
                          borderColor: `${selectedPartner.color}40`,
                          backgroundColor: `${selectedPartner.color}12`,
                          boxShadow: `0 0 20px ${selectedPartner.color}25`,
                        }}
                      >
                        {selectedPartner.logoImg ? (
                          <img
                            src={selectedPartner.logoImg}
                            alt={selectedPartner.name}
                            className="w-10 h-10 object-contain mix-blend-multiply"
                          />
                        ) : (
                          <i
                            className={`${selectedPartner.icon} text-3xl`}
                            style={{ color: selectedPartner.color }}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-2xl text-background-50">
                          {selectedPartner.name}
                        </h3>
                        <p className="text-xs font-mono text-primary-400 uppercase tracking-widest mt-0.5">
                          {selectedPartner.industry}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end bg-background-950 border border-background-50/10 rounded-xl px-5 py-3">
                      <span
                        className="text-lg font-black font-heading leading-none"
                        style={{ color: selectedPartner.color }}
                      >
                        {selectedPartner.keyMetric}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-background-100/40 mt-1">
                        {selectedPartner.keyMetricLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-background-100/80 text-sm sm:text-base leading-relaxed mb-6">
                    {selectedPartner.description}
                  </p>
                </div>

                <div
                  className="relative p-6 rounded-xl border bg-background-950/80"
                  style={{ borderColor: `${selectedPartner.color}25` }}
                >
                  <div
                    className="absolute inset-x-0 -bottom-px h-0.5"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${selectedPartner.color}, transparent)`,
                    }}
                  />

                  <i className="ri-double-quotes-l text-2xl absolute top-3 left-4 text-background-50/10 pointer-events-none" />
                  <p className="text-sm italic text-background-50/90 leading-relaxed font-sans pl-4 relative z-10">
                    "{selectedPartner.quote}"
                  </p>
                  <div className="mt-4 flex items-center gap-3 pl-4">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: selectedPartner.color }}
                    />
                    <span className="text-xs font-mono text-background-100/50 uppercase tracking-wide">
                      {selectedPartner.quoteAuthor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-background-50/10 pt-6 mt-2">
                  <span className="text-xs font-mono text-background-100/40">
                    Collaboration active • IMPACT POSITIF
                  </span>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-background-50 hover:text-primary-300 transition-colors"
                  >
                    Démarrer un projet similaire{" "}
                    <i className="ri-arrow-right-up-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Form */}
      <section className="py-12 md:py-24 bg-background-900/20 border-t border-background-50/10">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-primary-400 uppercase tracking-[0.2em] block mb-3">
              Unissons nos Forces
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-heading text-background-50 tracking-tight leading-none">
              Rejoindre l'Écosystème IMPACT
            </h2>
            <p className="mt-4 text-sm sm:text-base text-background-100/60 max-w-xl mx-auto">
              Vous êtes une marque innovante, un leader technologique ou un
              acteur de la création de premier plan ? Devenons partenaires pour
              façonner l'événementiel de demain.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-background-50/10 bg-background-950/80 backdrop-blur-sm shadow-xl">
            <form
              data-readdy-form
              id="partnership-application-form"
              onSubmit={handlePartnerSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="company_name"
                  >
                    Nom de l'entreprise
                  </label>
                  <input
                    id="company_name"
                    type="text"
                    name="company"
                    required
                    placeholder="Ex: Google Cloud"
                    className="w-full bg-background-900 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3.5 text-sm transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="company_website"
                  >
                    Site Internet / URL
                  </label>
                  <input
                    id="company_website"
                    type="url"
                    name="website"
                    placeholder="Ex: https://google.com"
                    className="w-full bg-background-900 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3.5 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="contact_name"
                  >
                    Nom du Contact principal
                  </label>
                  <input
                    id="contact_name"
                    type="text"
                    name="contact"
                    required
                    placeholder="Ex: Jean Dupont"
                    className="w-full bg-background-900 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3.5 text-sm transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                    htmlFor="contact_email"
                  >
                    Adresse E-mail professionnelle
                  </label>
                  <input
                    id="contact_email"
                    type="email"
                    name="email"
                    required
                    placeholder="Ex: j.dupont@entreprise.com"
                    className="w-full bg-background-900 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3.5 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-mono text-background-100/50 uppercase tracking-wider mb-2"
                  htmlFor="partnership_message"
                >
                  Votre proposition de collaboration / Synergie souhaitée
                </label>
                <textarea
                  id="partnership_message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Décrivez brièvement les synergies créatives, technologiques ou de services que vous souhaitez développer avec IMPACT POSITIF..."
                  className="w-full bg-background-900 border border-background-50/10 focus:border-primary-400 focus:outline-none text-background-50 placeholder:text-background-100/20 rounded px-4 py-3.5 text-sm transition-all resize-none"
                ></textarea>
              </div>

              <div className="hp-field-shell" aria-hidden="true">
                <label htmlFor="partnership_alt_contact">
                  Merci de laisser ce champ vide
                </label>
                <input
                  id="partnership_alt_contact"
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  readOnly
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 font-semibold px-6 py-4 rounded transition-colors cursor-pointer disabled:opacity-70"
              >
                {formStatus === "loading"
                  ? "Transmission du dossier…"
                  : "Soumettre notre demande de partenariat"}
                {formStatus !== "loading" && (
                  <i className="ri-shield-check-line text-sm"></i>
                )}
              </button>

              {formStatus === "success" && (
                <div className="p-4 rounded bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-line text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-bold">Demande envoyée avec succès !</p>
                    <p className="text-xs mt-0.5 text-primary-300/85">
                      Merci pour l'intérêt que vous portez à IMPACT POSITIF.
                      Notre comité de partenariat étudiera votre proposition et
                      reviendra vers vous sous 72 heures.
                    </p>
                  </div>
                </div>
              )}
              {formStatus === "error" && (
                <div className="p-4 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-2.5">
                  <i className="ri-error-warning-line text-lg flex-shrink-0 mt-0.5"></i>
                  <div>
                    <p className="font-bold">Erreur lors de la transmission</p>
                    <p className="text-xs mt-0.5 text-red-300/85">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Main Landing Page Layout View
// Projet Phare Highlight — fetched from Strapi
function FeaturedProjectHighlight() {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    fetchFeaturedProject().then(data => {
      if (data) setProject(data);
    });
  }, []);

  if (!project) return null;

  const coverUrl = getStrapiMediaUrl(project.coverImage) || '/images/IMG_3294.jpg';
  const galleryImages = project.galleryImages || [];

  return (
    <section className="bg-background-950 text-background-50 py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <FadeInUp>
          <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-red-500 uppercase mb-4">
            ★ Projet Phare
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            {project.title}
          </h2>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8">
          {/* Cover Image */}
          <FadeInUp delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src={coverUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {project.client && (
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-bold tracking-wider uppercase">
                    {project.client}
                  </span>
                </div>
              )}
            </div>
          </FadeInUp>

          {/* Details */}
          <FadeInUp delay={0.35}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-background-100/80 leading-relaxed">
                {project.description}
              </p>

              {/* Gallery thumbnails */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {galleryImages.slice(0, 6).map((img: any, i: number) => {
                    const url = getStrapiMediaUrl(img) || (typeof img === 'string' ? img : null);
                    if (!url) return null;
                    return (
                      <div key={i} className="rounded-lg overflow-hidden aspect-square">
                        <img src={url} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    );
                  })}
                </div>
              )}

              <Link
                to="/our-work"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors mt-4 shadow-lg shadow-red-600/20"
              >
                <span>Découvrir nos réalisations</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

function FieldExpertise() {
  const expertises = [
    { title: "Activation Client", description: "Expériences immersives et campagnes d'engagement direct." },
    { title: "Animation Point de Vente", description: "Dynamisation des ventes et interactions consommateurs." },
    { title: "Roadshow & Lancement", description: "Tournées promotionnelles sur l'ensemble du territoire." },
    { title: "Événements Privés & Pro", description: "Organisation sur-mesure de vos rendez-vous stratégiques." },
  ];

  return (
    <section className="bg-background-950 text-background-50 py-16 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <RevealText delay={0.1}>
            <span className="inline-block text-xs md:text-sm font-semibold tracking-[0.25em] text-primary-400 uppercase mb-6">
              Nos Compétences
            </span>
          </RevealText>
          <RevealText delay={0.25}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Notre Expertise <span className="text-primary-500 italic font-light">Terrain</span>
            </h2>
          </RevealText>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertises.map((item, idx) => (
            <RevealText key={idx} delay={0.3 + (idx * 0.1)}>
              <div className="border border-background-50/10 hover:border-primary-500/50 p-8 rounded-2xl bg-background-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group cursor-pointer h-full flex flex-col">
                <div className="w-12 h-12 bg-primary-500/10 text-primary-400 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-background-950 transition-colors">
                  <i className="ri-flashlight-fill text-xl"></i>
                </div>
                <h3 className="text-xl font-bold font-heading mb-4 group-hover:text-primary-300 transition-colors">{item.title}</h3>
                <p className="text-background-100/60 leading-relaxed text-sm mt-auto">
                  {item.description}
                </p>
              </div>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeView() {
  return (
    <div className="min-h-screen bg-background-50 text-foreground-950">
      <Header />
      <main>
        <Hero />
        <Approach />
        <FieldExpertise />
        <Marquee />
        <AdBanner position="home-middle" />
        <FeaturedProjects />
        <TestimonialsSection />
        <AdBanner position="home-bottom" />
        <ZoneAction />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// 404 / Placeholder Page Component
function NotFoundView() {
  const location = useLocation();
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 bg-background-50 text-foreground-950">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-100/60 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10 max-w-md mx-auto">
        <Link
          to="/"
          className="inline-block font-heading font-black text-2xl tracking-tight text-foreground-950 uppercase mb-8"
        >
          <img src="/images/logo.png" alt="IMPACT POSITIF Logo" className="h-16 w-auto object-contain drop-shadow-md mx-auto" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold mt-6 text-foreground-950">
          Cette page n'est pas disponible
        </h1>
        <p className="mt-2 text-sm text-foreground-500 font-mono bg-background-100 py-1.5 px-3 rounded border border-background-200 inline-block">
          {location.pathname}
        </p>
        <p className="mt-4 text-base text-foreground-600 leading-relaxed">
          Le chemin d'accès demandé est incorrect ou en cours de développement.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-background-50 font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer text-sm"
        >
          <i className="ri-arrow-left-line"></i> Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

// Router Setup
export default function App() {
  return (
    <HashRouter>
      <Seo />
      <ConnectionIndicator />
      <Preloader />
      <WhatsAppButton />
      <InstallPrompt />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/what-we-do" element={<PrestationsView />} />
        <Route path="/our-work" element={<RealisationsView />} />
        <Route path="/solutions" element={<PrestationsView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/partenaires" element={<PartenairesView />} />
        <Route path="/our-work/:id" element={<ProjectDetailPage />} />
        <Route path="/mediatheque" element={<MediathequePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </HashRouter>
  );

}
