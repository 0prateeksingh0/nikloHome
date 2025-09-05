import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">{t('location.title')}</h2>
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
          
          {/* Turkey Office Contact */}
          <div className="mt-6 md:mt-8 lg:mt-12 px-2 md:px-4 lg:px-0">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10 max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">Contact – Turkey Office</h3>
              <div className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-medium space-y-1">
                <p>Saraçlar İş Hanı, No: 203</p>
                <p>Merkez / EDİRNE</p>
                <p>Turkey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
