import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Location from './components/Location';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Features />
                  <Location />
                </>
              } />
            </Routes>
            <Footer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
