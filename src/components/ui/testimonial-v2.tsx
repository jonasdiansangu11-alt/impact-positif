import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { fetchTestimonials, getStrapiMediaUrl } from '../../lib/api';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
  avatar?: string;
}

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
              {props.testimonials.map(({ text, image, avatar, name, role }, i) => (
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
                        src={(typeof (avatar || image) === 'string' ? (avatar || image) : getStrapiMediaUrl(avatar || image)) || avatar || image}
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
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials().then(data => {
      if (data && data.length > 0) {
        setTestimonialsData(data);
      }
    });
  }, []);

  const firstColumn = testimonialsData.slice(0, Math.ceil(testimonialsData.length / 3));
  const secondColumn = testimonialsData.slice(Math.ceil(testimonialsData.length / 3), Math.ceil((testimonialsData.length / 3) * 2));
  const thirdColumn = testimonialsData.slice(Math.ceil((testimonialsData.length / 3) * 2));
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-neutral-950 py-16 md:py-24 relative overflow-hidden border-y border-white/5"
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
