import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

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
        
        <div className="max-w-7xl mx-auto">
          {/* Map Location - Full Width */}
          <div className="mb-12 md:mb-16">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Saraçlar+İş+Hanı,+Merkez,+Edirne,+Turkey&center=41.6771,26.5557&zoom=15"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Skopje Turkey Office Location"
                className="w-full h-[350px] md:h-[450px]"
              ></iframe>
            </div>
          </div>

          {/* Office Address - Centered */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('location.office_title')}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{t('location.office_desc')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Address */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-8 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {t('location.address_title')}
                  </h4>
                  <div className="text-gray-700 space-y-2 text-base">
                    <p className="font-semibold text-gray-900">{t('location.address_line1')}</p>
                    <p className="text-gray-600">{t('location.address_line2')}</p>
                    <p className="text-gray-600">{t('location.address_line3')}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <Link 
                  to="/contact"
                  className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 md:p-8 cursor-pointer hover:from-orange-100 hover:to-orange-200 transition-all duration-300 group block border border-orange-200"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {t('location.contact_title')}
                    <svg className="w-5 h-5 ml-2 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h4>
                  <div className="text-gray-700 space-y-3 text-base">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 mr-3 min-w-[80px]">{t('location.phone')}</span>
                      <a href="tel:02842145566" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">0284 214 55 66</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 mr-3 min-w-[80px]">{t('location.mobile')}</span>
                      <a href="tel:05327086515" className="text-orange-600 hover:text-orange-700 transition-colors font-medium">0532 708 65 15</a>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <p className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Click to send us a message →
                    </p>
                  </div>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <a 
                  href="https://www.google.com/maps/place/Saraçlar+İş+Hanı,+Merkez,+Edirne,+Turkey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t('location.visit_button')}
                </a>
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors border-2 border-orange-500 hover:border-orange-600 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Villas Section */}
          <div className="mt-16 md:mt-20">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Side - Villa Image */}
                <div className="relative h-80 md:h-96 lg:h-[500px]">
                  <img 
                    src="/Ville.jpeg" 
                    alt="Luxury Villas" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>
                
                {/* Right Side - Villa Text */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="max-w-lg">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                      Luxury Villas
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                      Discover our exclusive collection of premium villas designed for modern living. 
                      Each villa combines contemporary architecture with luxurious amenities to create 
                      the perfect home for discerning residents.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">Premium Location & Views</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">Modern Architecture & Design</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">High-Quality Materials & Finishes</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">Integrated Security Systems</span>
                      </div>
                    </div>
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

