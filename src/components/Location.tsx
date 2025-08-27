import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#886a4e] mb-3 md:mb-4">{t('location.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4 leading-relaxed">
            {t('location.description')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-2 md:mx-4 lg:mx-0">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Skopje,North+Macedonia&center=41.9983,21.4316&zoom=15"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Skopje Location"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]"
              ></iframe>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8 lg:mt-12 px-2 md:px-4 lg:px-0">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#886a4e] mb-1 md:mb-2">{t('location.prime')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{t('location.prime_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#886a4e] mb-1 md:mb-2">{t('location.access')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{t('location.access_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#886a4e] mb-1 md:mb-2">{t('location.views')}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{t('location.views_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
