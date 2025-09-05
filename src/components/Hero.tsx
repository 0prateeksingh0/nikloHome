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
      title: "GRAND THASSOS",
      subtitle: "Modern living by the thassos",
      image: "/hero2.jpeg"
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
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={slides[currentSlide].image} 
          alt={`${slides[currentSlide].title} - ${slides[currentSlide].subtitle}`} 
          className="w-full h-full object-cover object-center transition-opacity duration-1000"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>
          <button className="border-2 border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-base md:text-lg font-medium">
            INTERACTIVE MAP
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-primary-light transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2 md:p-3"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-primary-light transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2 md:p-3"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
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
