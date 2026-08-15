import React, { useState, useEffect } from 'react';
import { fetchTestimonials, getStrapiMediaUrl } from '../../lib/api';
import { TestimonialSlider, Testimonial } from './testimonial-slider';

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials().then(data => {
      if (data && data.length > 0) {
        // Map Strapi data to Testimonial interface
        const mappedData: Testimonial[] = data.map((t: any) => ({
          quote: t.text,
          name: t.name,
          role: t.role || '',
          rating: t.rating || 5,
          image: getStrapiMediaUrl(t.avatar || t.image) || t.avatar || t.image || '',
        }));
        setTestimonialsData(mappedData);
      }
    });
  }, []);

  if (testimonialsData.length === 0) return null;

  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-neutral-950 py-16 md:py-24 relative overflow-hidden border-y border-white/5"
    >
      {/* Background styling for consistency */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.12),transparent_60%)]" />
      </div>

      <div className="max-w-7xl px-6 md:px-10 lg:px-16 z-10 mx-auto relative">
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16 text-center relative z-10">
          <h2 
            id="testimonials-heading" 
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading"
          >
            Ce que disent nos partenaires
          </h2>
          <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
            Découvrez comment les plus grandes institutions et entreprises de la République Démocratique du Congo collaborent avec <span className="text-white font-semibold">IMPACT POSITIF</span>.
          </p>
        </div>

        <TestimonialSlider testimonials={testimonialsData} />
      </div>
    </section>
  );
}
