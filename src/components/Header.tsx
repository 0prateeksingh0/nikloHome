import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#f5f5f0] shadow-lg' : 'bg-transparent'
    }`}>
      {/* Centered Logo at Top */}
      <div className="flex justify-center py-4">
        <img src="/logo.png" alt="GRAND SKOPJE" className="h-16" />
      </div>

      {/* Separator Line */}
      <div className={`h-px bg-gray-300 mx-auto w-full max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-gray-300' : 'bg-white/30'
      }`}></div>

      {/* Main Navigation Bar - Single Line */}
      <div className={`border-b transition-all duration-300 ${
        isScrolled ? 'border-gray-200' : 'border-white/20'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 text-sm">
            {/* Left Side - Contact Info */}
            <div className={`flex items-center space-x-4 transition-all duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 .12-.03.24-.06.36l-2.2 2.2z" />
              </svg>
              <span>+389 70 355351 | +389 70 233055</span>
            </div>

            {/* Center - Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className={`flex items-center text-lg font-medium transition-all duration-300 ${
                  isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
                }`}>
                  BUILDINGS
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {/* Dropdown menu for BUILDINGS */}
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Building 1</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Building 2</a>
                </div>
              </div>
              <a href="#" className={`text-lg font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>3D MAP</a>
              <a href="#" className={`text-lg font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>GRAND STORIES</a>
              <a href="#" className={`text-lg font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>LOANS</a>
              <a href="#" className={`text-lg font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>ABOUT US</a>
              <a href="#" className={`text-lg font-medium transition-all duration-300 ${
                isScrolled ? 'text-gray-800 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>CONTACT</a>
            </div>

            {/* Right Side - Register, Language, Search */}
            <div className="flex items-center space-x-4">
              <button className={`relative group text-sm transition-all duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>
                REGISTER
                <span className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-orange-500 group-hover:w-full' : 'bg-orange-400 group-hover:w-full'
                }`}></span>
              </button>
              <span className={`h-4 w-px transition-all duration-300 ${
                isScrolled ? 'bg-gray-300' : 'bg-white/30'
              }`}></span>
              <span className={`text-sm transition-all duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>MK</span>
              <button className={`transition-all duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-400'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`text-2xl transition-all duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                &#9776; {/* Hamburger icon */}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden mt-4 space-y-2 transition-all duration-300 ${
              isScrolled ? 'bg-white text-gray-800' : 'bg-black/80 text-white'
            } p-4 rounded-md`}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">BUILDINGS</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">3D MAP</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">GRAND STORIES</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">LOANS</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">ABOUT US</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">CONTACT</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
