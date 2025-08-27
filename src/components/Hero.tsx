import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/hero1.jpeg" 
          alt="GRAND VIEW - The new landmark of the city" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-lg">
            {t('hero.button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
