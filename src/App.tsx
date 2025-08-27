import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Location from './components/Location';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Hero />
        <Features />
        <Location />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
