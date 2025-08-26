import React from 'react';

const Location: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#886a4e] mb-4">LOCATION</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            Discover the perfect location for your dream home. Our properties are strategically positioned 
            to offer the best of urban living with easy access to all amenities.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Map Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4 md:mx-0">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.308645447366!2d21.4316!3d41.9983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415a58c9aa2a7%3A0xb0e25bfb1fd0124f!2sSkopje%2C%20North%20Macedonia!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grand Skopje Location"
                className="w-full h-[300px] md:h-[450px]"
              ></iframe>
            </div>
          </div>
          
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12 px-4 md:px-0">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#886a4e] mb-2">Prime Location</h3>
              <p className="text-gray-600 text-sm md:text-base">Centrally located in the heart of Skopje with easy access to all major amenities.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#886a4e] mb-2">Quick Access</h3>
              <p className="text-gray-600 text-sm md:text-base">Minutes away from shopping centers, restaurants, and public transportation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#886a4e] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#886a4e] mb-2">Premium Views</h3>
              <p className="text-gray-600 text-sm md:text-base">Stunning views of the city skyline and surrounding mountains.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
