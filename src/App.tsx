import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicHeader from './components/PublicHeader';
import Hero from './components/Hero';
import Features from './components/Features';
import Location from './components/Location';
import Footer from './components/Footer';
import VillaPage from './components/VillaPage';
import ContactPage from './components/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={
              <div className="min-h-screen bg-white">
                <PublicHeader />
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <Features />
                      <Location />
                    </>
                  } />
                  <Route path="/villa/:slug" element={<VillaPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
                <Footer />
              </div>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
