import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          <div className="text-center p-3 md:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#886a4e] mb-1 md:mb-2">7-10</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">{t('features.apartments')}</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#886a4e] mb-1 md:mb-2">2-6</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">{t('features.rooms')}</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#886a4e] mb-1 md:mb-2">63m²-279m²</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">{t('features.size')}</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#886a4e] mb-1 md:mb-2">7</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-tight">{t('features.duplex')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
