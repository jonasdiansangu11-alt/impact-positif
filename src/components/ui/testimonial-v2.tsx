import React from 'react';
import { motion } from 'motion/react';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data tailored to IMPACT POSITIF in RDC with Congolese Names & African Professionals ---
const testimonials: Testimonial[] = [
  {
    text: "IMPACT POSITIF a transformé notre vision en réalité lors de notre forum annuel. Une logistique impeccable et une mise en scène technologique à couper le souffle à Kinshasa.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Prisca Mwamba",
    role: "Directrice Commerciale, Rawbank",
  },
  {
    text: "La mise en œuvre de nos lancements de produits n'a jamais été aussi fluide. Une équipe congolaise proactive, créative et extrêmement réactive face à tous les défis stratégiques.",
    image: "https://images.unsplash.com/photo-1507152832244-10d45a7e3575?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Jean-Paul Kabongo",
    role: "Responsable Événements, Vodacom RDC",
  },
  {
    text: "Un accompagnement d'exception du début à la fin. Ils ont su captiver notre public d'investisseurs et surpasser tous nos objectifs de communication corporative.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dorcas Kabedi",
    role: "Chef de Projet Marketing, Illicocash",
  },
  {
    text: "Leur maîtrise de l'événementiel hybride et de la scénographie moderne a offert à nos partenaires internationaux une expérience immersive mémorable à Goma.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dieudonné Lelo",
    role: "Secrétaire Permanent, FEC",
  },
  {
    text: "Une rigueur organisationnelle sans faille et une créativité sans limites qui font d'IMPACT POSITIF notre partenaire privilégié pour tous les sommets financiers en RDC.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Tshilombo",
    role: "Directrice Marketing, Aurora RDC",
  },
  {
    text: "Chaque détail a été soigné avec une précision chirurgicale. Les retours de nos invités de marque étaient unanimes : une expérience événementielle de classe mondiale.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Félix Ilunga",
    role: "Directeur de la Communication, Airtel RDC",
  },
  {
    text: "Une approche innovante qui a dynamisé l'engagement de notre public et grandement renforcé la résonance médiatique de nos lancements à Lubumbashi.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rachel Nyembo",
    role: "Directrice de Marque, Bracongo",
  },
  {
    text: "Ils ont compris instantanément nos enjeux stratégiques complexes et ont livré une production sur mesure d'une élégance rare et d'un professionnalisme hors pair.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Jonathan Mpiana",
    role: "Administrateur Délégué, Equity BCDC",
  },
  {
    text: "Grâce à leur expertise unique en design d'expérience et en scénographie immersive, notre exposition de marque a battu tous les records d'audience à Kinshasa.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Grâce Mutombo",
    role: "Responsable Relations Publiques, Africell RDC",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.04,
                    y: -10,
                    boxShadow: "0 20px 40px -5px rgba(239, 68, 68, 0.15), 0 10px 20px -10px rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.4)",
                    transition: { type: "spring", stiffness: 350, damping: 15 }
                  }}
                  whileFocus={{ 
                    scale: 1.04,
                    y: -10,
                    boxShadow: "0 20px 40px -5px rgba(239, 68, 68, 0.15), 0 10px 20px -10px rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.4)",
                    transition: { type: "spring", stiffness: 350, damping: 15 }
                  }}
                  className="p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl max-w-xs w-full bg-neutral-900/60 backdrop-blur-xl transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-red-500/50" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-300 leading-relaxed font-normal text-sm sm:text-base m-0 transition-colors duration-300">
                      « {text} »
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={`Avatar de ${name}`}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-red-500/40 transition-all duration-300 ease-in-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-xs sm:text-sm leading-5 tracking-tight text-neutral-400 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-neutral-950 py-24 relative overflow-hidden border-y border-white/5"
    >
      {/* --- Dynamic and Beautiful Animated Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Ambient Mesh Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-red-600/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 80, -50, 0],
            scale: [1, 1.2, 0.85, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-24 -right-20 w-[500px] h-[500px] rounded-full bg-red-500/15 blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neutral-900/40 blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="max-w-7xl px-6 md:px-10 lg:px-16 z-10 mx-auto relative"
      >
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-20 text-center relative z-10">

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            id="testimonials-heading" 
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading"
          >
            Ce que disent nos partenaires
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Découvrez comment les plus grandes institutions et entreprises de la République Démocratique du Congo collaborent avec <span className="text-white font-semibold">IMPACT POSITIF</span> pour concevoir des expériences inoubliables.
          </motion.p>
        </div>

        {/* Dynamic Scrolling Columns */}
        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] max-h-[660px] overflow-hidden relative z-10"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={26} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={32} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </motion.div>
    </section>
  );
}
