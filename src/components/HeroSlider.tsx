import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlides = slides.filter((s) => s.status === 'active');

  // Auto-advance every 6 seconds if not hovered
  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlide = activeSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900 shadow-2xl"
    >
      <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center">
        {/* Slide Background Image with Dark Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.image_url}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-12 md:px-16 py-12">
          {/* Subtle Campaign Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Curated Partner Deals</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>Updated Daily</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
            {currentSlide.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={currentSlide.cta_url || '/shop'}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(currentSlide.cta_url || '/shop');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-sm font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span>{currentSlide.cta_text || 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/categories"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/categories');
              }}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 text-sm font-semibold rounded-xl border border-neutral-700/80 transition-colors"
            >
              Browse Collections
            </a>
          </div>
        </div>

        {/* Arrow Navigation */}
        {activeSlides.length > 1 && (
          <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/60 transition-colors backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Slide Indicators */}
        {activeSlides.length > 1 && (
          <div className="absolute left-6 sm:left-12 bottom-6 z-20 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-8 bg-amber-500'
                    : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
