import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  className?: string;
}

const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          )}
        />
      ))}
    </div>
  );
};

export const TestimonialSlider = ({ testimonials, className }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 260, damping: 30 },
    }),
  };

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto overflow-hidden", className)}>
      <div className="relative min-h-[450px] md:min-h-[350px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center w-full p-4 md:p-8">
              {/* Image Section */}
              <div className="relative w-48 h-48 md:w-72 md:h-72 flex-shrink-0 mb-6 md:mb-0 md:mr-[-4rem] z-10">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-background-900"
                />
              </div>

              {/* Text & Controls Section */}
              <div className="relative w-full max-w-2xl bg-background-900 border border-background-800 text-white rounded-2xl shadow-2xl pt-10 md:pt-8 pl-6 md:pl-24 pr-6 pb-8">
                <Quote className="absolute top-6 left-6 md:left-24 h-10 w-10 text-primary-500/20" aria-hidden="true" />
                <blockquote className="text-base md:text-xl font-light mb-6 leading-relaxed relative z-10 text-background-200 italic">
                  "{currentTestimonial.quote}"
                </blockquote>
                <StarRating rating={currentTestimonial.rating} className="mb-6" />
                <div className="flex items-center justify-between">
                  <div className="pr-12">
                    <p className="font-bold text-xl text-white tracking-wide">{currentTestimonial.name}</p>
                    <p className="text-sm text-primary-400 uppercase tracking-widest font-mono mt-1">{currentTestimonial.role}</p>
                  </div>
                  {/* Navigation Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-background-800 hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-900 text-white"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-background-800 hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-900 text-white"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              currentIndex === index ? 'w-8 bg-primary-500' : 'bg-background-700 hover:bg-background-600'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
