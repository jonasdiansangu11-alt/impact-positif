import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchAds, getStrapiMediaUrl } from "../../lib/api";

interface AdBannerProps {
  position: "home-middle" | "home-bottom" | string;
}

export default function AdBanner({ position }: AdBannerProps) {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    fetchAds().then((ads) => {
      if (ads && ads.length > 0) {
        const found = ads.find((a: any) => a.position === position);
        if (found) setAd(found);
      }
    });
  }, [position]);

  if (!ad) return null;

  return (
    <section className="w-full py-8 md:py-12 bg-black flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-neutral-900/50 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full px-6 md:px-10 relative z-10"
      >
        <a
          href={ad.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
          <img
            src={(typeof ad.imageUrl === 'string' ? ad.imageUrl : getStrapiMediaUrl(ad.imageUrl)) || (typeof ad.image === 'string' ? ad.image : getStrapiMediaUrl(ad.image)) || ad.imageUrl || ad.image}
            alt={ad.title}
            className="w-full h-[250px] md:h-[300px] object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-white/50 uppercase mb-2 block">
                Partenaire Sponsoring
              </span>
              <h3 className="text-xl md:text-3xl font-heading font-black text-white group-hover:text-primary-300 transition-colors">
                {ad.title}
              </h3>
              {ad.description && (
                <p className="mt-2 text-sm md:text-base text-neutral-300 max-w-lg">
                  {ad.description}
                </p>
              )}
            </div>
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-primary-500 group-hover:border-primary-400 group-hover:text-white transition-all duration-300">
              <i className="ri-arrow-right-up-line text-xl"></i>
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
