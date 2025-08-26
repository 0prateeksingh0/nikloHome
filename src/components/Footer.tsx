import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#253847] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Column - Logo and Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="GRAND SKOPJE" className="h-12 mr-3" />
            </div>
            <p className="text-[#C0C0C0] text-sm mb-2">A project developed by</p>
            <div className="text-[#C0C0C0] font-bold">
              <div className="text-lg">MGF</div>
              <div className="text-sm">COMPANY</div>
            </div>
          </div>

          {/* Middle Column - Contact */}
          <div>
            <h3 className="text-[#af8c69] font-bold mb-4">Contact:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="text-[#C0C0C0]">info@grandskopje.mk</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-[#C0C0C0]">+389 70 355351</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-[#C0C0C0]">+389 70 233055</span>
              </div>
            </div>
          </div>

          {/* Right Column - Social & Subscribe */}
          <div>
            <h3 className="text-[#af8c69] font-bold mb-4">Follow us:</h3>
            <div className="flex space-x-3 mb-6">
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
            
            <h3 className="text-[#af8c69] font-bold mb-4">Subscribe:</h3>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Your Email (required)"
                className="w-full px-3 py-2 bg-white text-gray-800 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#af8c69]"
              />
              <button className="w-full bg-[#253847] text-white py-2 px-4 rounded border border-white hover:bg-[#af8c69] transition-colors">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-[#1a2a35]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors">HOME</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors">BUILDINGS</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors">ABOUT US</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors">CONTACT</a>
              <a href="#" className="text-[#af8c69] hover:text-white transition-colors">PRIVACY POLICY</a>
            </div>
            <div className="text-white/80 text-sm">
              Copyright 2025 © GRAND - SKOPJE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
