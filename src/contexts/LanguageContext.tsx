import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'nav.buildings': 'BUILDINGS',
    'nav.3dmap': '3D MAP',
    'nav.stories': 'GRAND STORIES',
    'nav.about': 'ABOUT US',
    'nav.contact': 'CONTACT',
    'nav.register': 'REGISTER',
    
    // Hero
    'hero.title': 'GRAND VIEW',
    'hero.subtitle': 'The new landmark of the city',
    'hero.button': 'INTERACTIVE MAP',
    
    // Features
    'features.apartments': 'APARTMENTS PER FLOOR',
    'features.rooms': 'ROOMS PER APARTMENT',
    'features.size': 'APARTMENT SIZE',
    'features.duplex': 'DUPLEX APARTMENTS',
    
    // Location
    'location.title': 'LOCATION',
    'location.description': 'Discover the perfect location for your dream home. Our properties are strategically positioned to offer the best of urban living with easy access to all amenities.',
    'location.prime': 'Prime Location',
    'location.prime_desc': 'Centrally located in the heart of Skopje with easy access to all major amenities.',
    'location.access': 'Quick Access',
    'location.access_desc': 'Minutes away from shopping centers, restaurants, and public transportation.',
    'location.views': 'Premium Views',
    'location.views_desc': 'Stunning views of the city skyline and surrounding mountains.',
    
    // Footer
    'footer.contact': 'Contact:',
    'footer.follow': 'Follow us:',
    'footer.subscribe': 'Subscribe:',
    'footer.email_placeholder': 'Your Email (required)',
    'footer.signup': 'SIGN UP',
    'footer.copyright': 'Copyright 2025 © GRAND - SKOPJE',
    'footer.home': 'HOME',
    'footer.buildings': 'BUILDINGS',
    'footer.about': 'ABOUT US',
    'footer.contact_link': 'CONTACT',
    'footer.privacy': 'PRIVACY POLICY'
  },
  tr: {
    // Header
    'nav.buildings': 'BİNALAR',
    'nav.3dmap': '3D HARİTA',
    'nav.stories': 'GRAND HİKAYELER',
    'nav.about': 'HAKKIMIZDA',
    'nav.contact': 'İLETİŞİM',
    'nav.register': 'KAYIT OL',
    
    // Hero
    'hero.title': 'GRAND GÖRÜNÜM',
    'hero.subtitle': 'Şehrin yeni simgesi',
    'hero.button': 'İNTERAKTİF HARİTA',
    
    // Features
    'features.apartments': 'KAT BAŞINA DAİRE',
    'features.rooms': 'DAİRE BAŞINA ODA',
    'features.size': 'DAİRE BÜYÜKLÜĞÜ',
    'features.duplex': 'DUBLEKS DAİRE',
    
    // Location
    'location.title': 'KONUM',
    'location.description': 'Hayalinizdeki ev için mükemmel konumu keşfedin. Mülklerimiz, tüm olanaklara kolay erişim ile kentsel yaşamın en iyisini sunmak için stratejik olarak konumlandırılmıştır.',
    'location.prime': 'Merkezi Konum',
    'location.prime_desc': 'Skopje\'nin kalbinde, tüm ana olanaklara kolay erişim ile merkezi konumda.',
    'location.access': 'Hızlı Erişim',
    'location.access_desc': 'Alışveriş merkezleri, restoranlar ve toplu taşıma araçlarına dakikalar uzaklıkta.',
    'location.views': 'Premium Manzara',
    'location.views_desc': 'Şehir silüeti ve çevre dağların muhteşem manzarası.',
    
    // Footer
    'footer.contact': 'İletişim:',
    'footer.follow': 'Bizi takip edin:',
    'footer.subscribe': 'Abone ol:',
    'footer.email_placeholder': 'E-posta adresiniz (gerekli)',
    'footer.signup': 'KAYIT OL',
    'footer.copyright': 'Telif Hakkı 2025 © GRAND - SKOPJE',
    'footer.home': 'ANA SAYFA',
    'footer.buildings': 'BİNALAR',
    'footer.about': 'HAKKIMIZDA',
    'footer.contact_link': 'İLETİŞİM',
    'footer.privacy': 'GİZLİLİK POLİTİKASI'
  },
  el: {
    // Header
    'nav.buildings': 'ΚΤΙΡΙΑ',
    'nav.3dmap': '3D ΧΑΡΤΗΣ',
    'nav.stories': 'GRAND ΙΣΤΟΡΙΕΣ',
    'nav.about': 'ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ',
    'nav.contact': 'ΕΠΙΚΟΙΝΩΝΙΑ',
    'nav.register': 'ΕΓΓΡΑΦΗ',
    
    // Hero
    'hero.title': 'GRAND ΘΕΑ',
    'hero.subtitle': 'Το νέο ορόσημο της πόλης',
    'hero.button': 'ΔΙΑΔΡΑΣΤΙΚΟΣ ΧΑΡΤΗΣ',
    
    // Features
    'features.apartments': 'ΔΙΑΜΕΡΙΣΜΑΤΑ ΑΝΑ ΟΡΟΦΟ',
    'features.rooms': 'ΔΩΜΑΤΙΑ ΑΝΑ ΔΙΑΜΕΡΙΣΜΑ',
    'features.size': 'ΜΕΓΕΘΟΣ ΔΙΑΜΕΡΙΣΜΑΤΟΣ',
    'features.duplex': 'ΔΙΠΛΑ ΔΙΑΜΕΡΙΣΜΑΤΑ',
    
    // Location
    'location.title': 'ΤΟΠΟΘΕΣΙΑ',
    'location.description': 'Ανακαλύψτε την τέλεια τοποθεσία για το σπίτι των ονείρων σας. Οι ιδιοκτησίες μας είναι στρατηγικά τοποθετημένες για να προσφέρουν το καλύτερο της αστικής ζωής με εύκολη πρόσβαση σε όλες τις ανέσεις.',
    'location.prime': 'Κεντρική Τοποθεσία',
    'location.prime_desc': 'Κεντρικά τοποθετημένη στην καρδιά της Σκόπιας με εύκολη πρόσβαση σε όλες τις κύριες ανέσεις.',
    'location.access': 'Γρήγορη Πρόσβαση',
    'location.access_desc': 'Λεπτά μακριά από εμπορικά κέντρα, εστιατόρια και δημόσια συγκοινωνία.',
    'location.views': 'Προνομιακή Θέα',
    'location.views_desc': 'Εντυπωσιακή θέα της ουρανογραμμής της πόλης και των γύρω βουνών.',
    
    // Footer
    'footer.contact': 'Επικοινωνία:',
    'footer.follow': 'Ακολουθήστε μας:',
    'footer.subscribe': 'Εγγραφή:',
    'footer.email_placeholder': 'Το email σας (απαιτείται)',
    'footer.signup': 'ΕΓΓΡΑΦΗ',
    'footer.copyright': 'Πνευματικά Δικαιώματα 2025 © GRAND - SKOPJE',
    'footer.home': 'ΑΡΧΙΚΗ',
    'footer.buildings': 'ΚΤΙΡΙΑ',
    'footer.about': 'ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ',
    'footer.contact_link': 'ΕΠΙΚΟΙΝΩΝΙΑ',
    'footer.privacy': 'ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations];
    return currentTranslations?.[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
