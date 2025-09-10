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
    
    // Villas
    'villas.title': 'Luxury Villas',
    'villas.description': 'Discover our exclusive collection of luxury villas designed for modern living. Each property offers unique features and premium amenities.',
    'villas.feature1': 'Premium location with stunning views',
    'villas.feature2': 'Modern architecture and design',
    'villas.feature3': 'High-quality finishes and materials',
    
    // Location
    'location.title': 'OUR OFFICE LOCATION',
    'location.description': 'Visit our office to discuss your dream home. We\'re here to help you find the perfect property.',
    'location.office_title': 'Our Turkey Office',
    'location.office_desc': 'Visit us at our office for personalized assistance',
    'location.address_title': 'Address',
    'location.contact_title': 'Contact',
    'location.phone': 'Phone:',
    'location.mobile': 'Mobile:',
    'location.visit_button': 'Schedule a Visit',
    'location.address_line1': 'Saraçlar İş Hanı, No: 203',
    'location.address_line2': 'Merkez / EDİRNE',
    'location.address_line3': 'Turkey',
    
    // Footer
    'footer.contact': 'Contact:',
    'footer.follow': 'Follow us:',
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
    
    // Villas
    'villas.title': 'Lüks Villalar',
    'villas.description': 'Modern yaşam için tasarlanmış özel villa koleksiyonumuzu keşfedin. Her mülk benzersiz özellikler ve premium olanaklar sunar.',
    'villas.feature1': 'Muhteşem manzaralı premium konum',
    'villas.feature2': 'Modern mimari ve tasarım',
    'villas.feature3': 'Yüksek kaliteli kaplamalar ve malzemeler',
    
    // Location
    'location.title': 'OFİS KONUMUMUZ',
    'location.description': 'Hayalinizdeki ev hakkında konuşmak için ofisimizi ziyaret edin. Mükemmel mülkü bulmanızda size yardımcı olmak için buradayız.',
    'location.office_title': 'Türkiye Ofisimiz',
    'location.office_desc': 'Kişiselleştirilmiş yardım için ofisimizi ziyaret edin',
    'location.address_title': 'Adres',
    'location.contact_title': 'İletişim',
    'location.phone': 'Telefon:',
    'location.mobile': 'Cep:',
    'location.visit_button': 'Ziyaret Planla',
    'location.address_line1': 'Saraçlar İş Hanı, No: 203',
    'location.address_line2': 'Merkez / EDİRNE',
    'location.address_line3': 'Türkiye',
    
    // Footer
    'footer.contact': 'İletişim:',
    'footer.follow': 'Bizi takip edin:',
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
    
    // Villas
    'villas.title': 'Πολυτελή Βίλες',
    'villas.description': 'Ανακαλύψτε την αποκλειστική συλλογή πολυτελών βιλών μας που σχεδιάστηκαν για σύγχρονη διαβίωση. Κάθε ιδιοκτησία προσφέρει μοναδικά χαρακτηριστικά και premium ανέσεις.',
    'villas.feature1': 'Premium τοποθεσία με εντυπωσιακές θέα',
    'villas.feature2': 'Σύγχρονη αρχιτεκτονική και σχεδιασμός',
    'villas.feature3': 'Υψηλής ποιότητας φινιρίσματα και υλικά',
    
    // Location
    'location.title': 'Η ΤΟΠΟΘΕΣΙΑ ΤΟΥ ΓΡΑΦΕΙΟΥ ΜΑΣ',
    'location.description': 'Επισκεφτείτε το γραφείο μας για να συζητήσουμε για το σπίτι των ονείρων σας. Είμαστε εδώ για να σας βοηθήσουμε να βρείτε την τέλεια ιδιοκτησία.',
    'location.office_title': 'Το Γραφείο μας στην Τουρκία',
    'location.office_desc': 'Επισκεφτείτε μας στο γραφείο για εξατομικευμένη βοήθεια',
    'location.address_title': 'Διεύθυνση',
    'location.contact_title': 'Επικοινωνία',
    'location.phone': 'Τηλέφωνο:',
    'location.mobile': 'Κινητό:',
    'location.visit_button': 'Προγραμματίστε Επίσκεψη',
    'location.address_line1': 'Saraçlar İş Hanı, No: 203',
    'location.address_line2': 'Merkez / EDİRNE',
    'location.address_line3': 'Τουρκία',
    
    // Footer
    'footer.contact': 'Επικοινωνία:',
    'footer.follow': 'Ακολουθήστε μας:',
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
