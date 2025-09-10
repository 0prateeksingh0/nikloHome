import React from 'react';
import Header from './Header';
import ContactForm from './ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header variant="contact" />
      
      {/* Main Content */}
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </main>
      
      {/* Footer */}
    </div>
  );
};

export default ContactPage;
