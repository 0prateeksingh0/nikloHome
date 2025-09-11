import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Location: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Villas Section */}
        <div className="mb-16 md:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image - Made Larger */}
              <div className="order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img 
                    src="/Ville.jpeg" 
                    alt="Luxury Villas"
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover image-optimized"
                    style={{
                      imageRendering: 'auto'
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Content - Thinner Fonts */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
                    {t('villas.title')}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-light">
                    {t('villas.description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2A3B49] rounded-full mr-3"></div>
                      <span className="text-gray-700 font-light">{t('villas.feature1')}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2A3B49] rounded-full mr-3"></div>
                      <span className="text-gray-700 font-light">{t('villas.feature2')}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#2A3B49] rounded-full mr-3"></div>
                      <span className="text-gray-700 font-light">{t('villas.feature3')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Office Location Header - Above Map */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2A3B49] mb-3 md:mb-4">{t('location.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2 md:px-4 leading-relaxed font-light">
              {t('location.description')}
            </p>
          </div>

          {/* Map and Office Location - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 md:mb-16">
            {/* Map - Left Side */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Saraçlar+İş+Hanı,+Merkez,+Edirne,+Turkey&center=41.6771,26.5557&zoom=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Skopje Turkey Office Location"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Office Address - Right Side */}
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-gray-100 h-[400px] md:h-[500px] flex flex-col">
              <div className="text-center mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#2A3B49] to-[#1e2a35] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">{t('location.office_title')}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">{t('location.office_desc')}</p>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <h4 className="text-base font-light text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-[#2A3B49] rounded-lg flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {t('location.address_title')}
                  </h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p className="font-light text-gray-900">{t('location.address_line1')}</p>
                    <p className="font-light text-gray-600">{t('location.address_line2')}</p>
                    <p className="font-light text-gray-600">{t('location.address_line3')}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <Link 
                  to="/contact"
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group block border border-gray-200"
                >
                  <h4 className="text-base font-light text-gray-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-[#2A3B49] rounded-lg flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {t('location.contact_title')}
                    <svg className="w-4 h-4 ml-2 text-[#2A3B49] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <div className="text-gray-700 space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-light text-gray-900 mr-2 min-w-[60px]">{t('location.phone')}</span>
                      <a href="tel:02842145566" className="text-[#2A3B49] hover:text-[#1e2a35] transition-colors font-light">0284 214 55 66</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-light text-gray-900 mr-2 min-w-[60px]">{t('location.mobile')}</span>
                      <a href="tel:05327086515" className="text-[#2A3B49] hover:text-[#1e2a35] transition-colors font-light">0532 708 65 15</a>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Contact Button */}
              <div className="mt-4 flex justify-center">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-2 bg-[#2A3B49] text-white font-semibold rounded-lg hover:bg-[#1e2a35] transition-colors shadow-lg hover:shadow-xl text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

