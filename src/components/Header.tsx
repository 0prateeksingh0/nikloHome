import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const villas = [
    {
      title: "GRAND VIEW",
      subtitle: "The new landmark of the city",
      image: "/hero1.jpeg",
      status: "SOLD",
      slug: "grand-view"
    },
    {
      title: "GRAND THASSOS",
      subtitle: "Modern living by the thassos",
      image: "/hero2.jpeg",
      status: "AVAILABLE",
      slug: "grand-thassos"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const navigateToVilla = (slug: string) => {
    window.location.href = `/villa/${slug}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#f5f5f0] shadow-lg' : 'bg-transparent'
    }`}>
      {/* Centered Logo at Top */}
      <div className="flex justify-center py-2 md:py-4">
        <img src="/logo.png" alt="GRAND SKOPJE" className="h-16 md:h-18" />
      </div>
      
      {/* Separator Line */}
      <div className={`h-px mx-auto w-full max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-gray-300' : 'bg-white/30'
      }`}></div>
      
      {/* Main Navigation Bar - Single Line */}
      <div className={`border-b transition-all duration-300 ${
        isScrolled ? 'border-gray-200' : 'border-white/20'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-4 text-xs md:text-sm">
            {/* Left Side - Contact Info */}
            <div className={`hidden md:flex items-center space-x-4 transition-all duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 .12-.03.24-.06.36l-2.2 2.2z" />
              </svg>
              <span>
                <a href="tel:02842145566" className="hover:text-orange-400 transition-colors">0284 214 55 66</a>
                <span className="mx-2">|</span>
                <a href="tel:05327086515" className="hover:text-orange-400 transition-colors">0532 708 65 15</a>
              </span>
            </div>
            
            {/* Center - Navigation Links */}
            <div className="hidden lg:flex items-center space-x-3 md:space-x-4">
              <div className="relative group">
                <button className={`flex items-center text-sm md:text-base font-medium transition-all duration-300 ${
                  isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
                }`}>
                  VILLAS
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {/* Dropdown menu for VILLAS - White overlay with side-by-side layout */}
                <div className="absolute left-0 mt-2 w-[600px] bg-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-[100] overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    {villas.map((villa, index) => (
                      <div 
                        key={index}
                        className="relative overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                        onClick={() => navigateToVilla(villa.slug)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={villa.image} 
                            alt={villa.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                          
                          {/* Content Overlay - Only name centered */}
                          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                            <h3 className="text-xl font-bold">{villa.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <a href="#" className={`text-sm md:text-base font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>{t('nav.3dmap')}</a>
              <a href="#" className={`text-sm md:text-base font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>{t('nav.stories')}</a>
              <a href="#" className={`text-sm md:text-base font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>{t('nav.about')}</a>
              <a href="#" className={`text-sm md:text-base font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>{t('nav.contact')}</a>
            </div>

            {/* Right Side - Auth, Language, Search */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-4">
                  <span className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                    isScrolled ? 'text-orange-600' : 'text-white'
                  }`}>
                    Welcome, {user?.name}
                  </span>
                  <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className={`relative group text-xs md:text-sm font-medium transition-all duration-300 ${
                      isScrolled ? 'text-orange-600 hover:text-orange-700' : 'text-white hover:text-orange-400'
                    }`}
                  >
                    Profile
                    <span className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                      isScrolled ? 'bg-orange-600 group-hover:w-full' : 'bg-orange-400 group-hover:w-full'
                    }`}></span>
                  </button>
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => setIsAdminModalOpen(true)}
                      className={`relative group text-xs md:text-sm font-medium transition-all duration-300 ${
                        isScrolled ? 'text-orange-700 hover:text-orange-600' : 'text-white hover:text-orange-400'
                      }`}
                    >
                      Admin
                      <span className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                        isScrolled ? 'bg-orange-700 group-hover:w-full' : 'bg-orange-400 group-hover:w-full'
                      }`}></span>
                    </button>
                  )}
                  <button 
                    onClick={logout}
                    className={`relative group text-xs md:text-sm font-medium transition-all duration-300 ${
                      isScrolled ? 'text-red-600 hover:text-red-800' : 'text-red-300 hover:text-red-100'
                    }`}
                  >
                    Logout
                    <span className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                      isScrolled ? 'bg-red-600 group-hover:w-full' : 'bg-red-300 group-hover:w-full'
                    }`}></span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`hidden md:block relative group text-xs md:text-sm transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                  }`}
                >
                  {t('nav.register')}
                  <span className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                    isScrolled ? 'bg-orange-500 group-hover:w-full' : 'bg-orange-400 group-hover:w-full'
                  }`}></span>
                </button>
              )}
              <span className={`hidden md:block h-4 w-px transition-all duration-300 ${
                isScrolled ? 'bg-gray-300' : 'bg-white/30'
              }`}></span>
              
              {/* Desktop Language Selector */}
              <div className="hidden md:block relative" ref={languageDropdownRef}>
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className={`flex items-center space-x-1 md:space-x-2 transition-all duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
                  }`}
                >
                  <span className="text-base md:text-lg">{currentLanguage?.flag}</span>
                  <span className="text-xs md:text-sm">{currentLanguage?.code.toUpperCase()}</span>
                  <svg className="w-2 h-2 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white rounded-md shadow-lg z-[100] border border-gray-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-gray-50 text-orange-600' : 'text-gray-800'
                        }`}
                      >
                        <span className="text-base md:text-lg">{lang.flag}</span>
                        <span className="text-xs md:text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Language Display */}
              <div className="md:hidden flex items-center space-x-1">
                <span className="text-base">{currentLanguage?.flag}</span>
                <span className="text-xs">{currentLanguage?.code.toUpperCase()}</span>
              </div>
              
              <button className={`transition-all duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`text-xl md:text-2xl transition-all duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                &#9776; {/* Hamburger icon */}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden mt-4 space-y-1 transition-all duration-300 ${
              isScrolled ? 'bg-white text-gray-800' : 'bg-black/90 text-white'
            } p-4 rounded-md`}>
              {/* Mobile Contact Info */}
              <div className={`flex items-center space-x-2 mb-4 pb-3 border-b ${
                isScrolled ? 'border-gray-200' : 'border-white/20'
              }`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 .12-.03.24-.06.36l-2.2 2.2z" />
                </svg>
                <span className="text-sm">
                  <a href="tel:02842145566" className="hover:text-orange-400 transition-colors">0284 214 55 66</a>
                  <span className="mx-2">|</span>
                  <a href="tel:05327086515" className="hover:text-orange-400 transition-colors">0532 708 65 15</a>
                </span>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="mb-4">
                <span className="block px-4 py-2 text-base font-medium text-gray-600">VILLAS</span>
                {villas.map((villa, index) => (
                  <div 
                    key={index}
                    className="relative overflow-hidden cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-300 mb-2"
                    onClick={() => navigateToVilla(villa.slug)}
                  >
                    <div className="relative h-24">
                      <img 
                        src={villa.image} 
                        alt={villa.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center text-white text-center p-3">
                        <h3 className="text-sm font-bold">{villa.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="block px-4 py-3 text-sm hover:bg-gray-100 rounded-md transition-colors">{t('nav.3dmap')}</a>
              <a href="#" className="block px-4 py-3 text-sm hover:bg-gray-100 rounded-md transition-colors">{t('nav.stories')}</a>
              <a href="#" className="block px-4 py-3 text-sm hover:bg-gray-100 rounded-md transition-colors">{t('nav.about')}</a>
              <a href="#" className="block px-4 py-3 text-sm hover:bg-gray-100 rounded-md transition-colors">{t('nav.contact')}</a>
              
              {/* Mobile Language Selector */}
              <div className="pt-3 border-t border-gray-200">
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-600">Language:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        language === lang.code 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-xs">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Auth Button */}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-medium text-orange-600">
                      Welcome, {user?.name}
                    </div>
                    <button 
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-4 py-3 text-base font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-center"
                    >
                      Profile
                    </button>
                    {user?.role === 'admin' && (
                      <button 
                        onClick={() => {
                          setIsAdminModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full px-4 py-3 text-base font-medium bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-center"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button 
                      onClick={logout}
                      className="w-full px-4 py-3 text-base font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-base font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    {t('nav.register')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {/* Profile Modal */}
      <UserProfile 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
      
      {/* Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
