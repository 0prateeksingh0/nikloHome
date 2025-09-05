import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-3 md:mb-4">{t('location.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4 leading-relaxed">
            {t('location.description')}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-2 md:mx-4 lg:mx-0">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Saraçlar+İş+Hanı,+Merkez,+Edirne,+Turkey&center=41.6771,26.5557&zoom=15"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Skopje Turkey Office Location"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]"
              ></iframe>
            </div>
          </div>
          
          {/* Turkey Office Contact */}
          <div className="mt-6 md:mt-8 lg:mt-12 px-2 md:px-4 lg:px-0">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-3 md:mb-4">{t('location.office_title')}</h3>
                <p className="text-gray-600 text-sm md:text-base">{t('location.office_desc')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('location.address_title')}
                  </h4>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{t('location.address_line1')}</p>
                    <p>{t('location.address_line2')}</p>
                    <p>{t('location.address_line3')}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {t('location.contact_title')}
                  </h4>
                  <div className="text-gray-700 space-y-2">
                    <p className="flex items-center">
                      <span className="font-medium mr-2">{t('location.phone')}</span>
                      <a href="tel:02842145566" className="text-orange-600 hover:text-orange-700 transition-colors">0284 214 55 66</a>
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">{t('location.mobile')}</span>
                      <a href="tel:05327086515" className="text-orange-600 hover:text-orange-700 transition-colors">0532 708 65 15</a>
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
