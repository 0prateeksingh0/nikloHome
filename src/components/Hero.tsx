import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "GRAND VIEW",
      subtitle: "The new landmark of the city",
      image: "/hero1.jpeg"
    },
    {
      title: "GRAND RIVER",
      subtitle: "Modern living by the river",
      image: "/hero2.jpg"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10"></div>
        <img 
          src={slides[currentSlide].image} 
          alt="Grand View Building"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
          {slides[currentSlide].title}
        </h1>
        <p className="text-2xl md:text-3xl mb-8 text-white/90 font-light italic">
          {slides[currentSlide].subtitle}
        </p>
        
        {/* Call to Action Buttons */}
        <div className="space-y-4">
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-lg">
            INTERACTIVE MAP
          </button>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300">
              BROCHURE (3-15 FLOOR)
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300">
              BROCHURE (16-17 FLOOR)
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-orange-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white hover:text-orange-400 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
