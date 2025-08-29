import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#3e5362] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Left Column - Logo and Company Info */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <img src="/logo.png" alt="GRAND SKOPJE" className="h-18 md:h-18 mr-3 md:mr-6" />
            </div>
           
          </div>

          {/* Middle Column - Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-[#af8c69] font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.contact')}</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:nilkohome@gmail.com" className="text-[#C0C0C0] hover:text-[#af8c69] transition-colors text-sm md:text-base break-all">nilkohome@gmail.com</a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:02842145566" className="text-[#C0C0C0] hover:text-[#af8c69] transition-colors text-sm md:text-base">0284 214 55 66</a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:05327086515" className="text-[#C0C0C0] hover:text-[#af8c69] transition-colors text-sm md:text-base">0532 708 65 15</a>
              </div>
            </div>
          </div>

          {/* Right Column - Social & Subscribe */}
          <div className="text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-[#af8c69] font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.follow')}</h3>
            <div className="flex justify-center sm:justify-start space-x-3 mb-4 md:mb-6">
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#253847] hover:bg-[#af8c69] hover:text-white transition-colors">
                <span className="font-bold text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#253847] hover:bg-[#af8c69] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#253847] hover:bg-[#af8c69] hover:text-white transition-colors">
                <span className="font-bold text-sm">in</span>
              </a>
            </div>
            
            <h3 className="text-[#af8c69] font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.subscribe')}</h3>
            <div className="space-y-2 max-w-xs mx-auto sm:mx-0">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')}
                className="w-full px-3 py-2 bg-white text-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#af8c69] text-sm md:text-base"
              />
              <button className="w-full bg-[#253847] text-white py-2 px-4 rounded border border-white hover:bg-[#af8c69] transition-colors text-sm md:text-base">
                {t('footer.signup')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-[#1a2a35]">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 text-center">
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors text-sm md:text-base">{t('footer.home')}</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors text-sm md:text-base">{t('footer.buildings')}</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors text-sm md:text-base">{t('footer.about')}</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors text-sm md:text-base">{t('footer.contact_link')}</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors text-sm md:text-base">{t('footer.privacy')}</a>
            </div>
            <div className="text-white/80 text-xs md:text-sm text-center md:text-left">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
