import React, { useState } from 'react';

const Features: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);

  const villas = [
    {
      image: "/hero1.jpeg",
      title: "GRAND VIEW",
      subtitle: "The new landmark of the city",
      status: "SOLD"
    },
    {
      image: "/hero2.jpeg", 
      title: "GRAND THASSOS",
      subtitle: "Modern living by the thassos",
      status: "AVAILABLE",
      hasLocation: true
    }
  ];

  const pdfFiles = [
    "/pdf/property1.pdf",
    "/pdf/property2.pdf"
  ];

  const openPdfModal = () => {
    setIsPdfModalOpen(true);
    setCurrentPdfIndex(0);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const nextPdf = () => {
    setCurrentPdfIndex((prev) => (prev + 1) % pdfFiles.length);
  };

  const prevPdf = () => {
    setCurrentPdfIndex((prev) => (prev - 1 + pdfFiles.length) % pdfFiles.length);
  };

  return (
    <>
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#886a4e] mb-4 md:mb-6">Popular Villa</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {villas.map((villa, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-64 md:h-80 lg:h-96">
                  <img 
                    src={villa.image} 
                    alt={villa.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      villa.status === "SOLD" 
                        ? "bg-red-500 text-white" 
                        : "bg-green-500 text-white"
                    }`}>
                      {villa.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">{villa.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4">{villa.subtitle}</p>
                    {villa.hasLocation && (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={openPdfModal}
                          className="bg-[#886a4e] hover:bg-[#6d5a3f] text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm md:text-base font-medium"
                        >
                          View Details
                        </button>
                        <a 
                          href="https://maps.app.goo.gl/tRJdDYjmtH9qZzQg9?g_st=aw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-gray-100 text-[#886a4e] px-4 py-2 rounded-lg transition-colors duration-300 text-sm md:text-base font-medium text-center"
                        >
                          Location
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-full max-h-[90vh] relative flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">GRAND THASSOS - Property Details</h3>
              <button 
                onClick={closePdfModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={`${pdfFiles[currentPdfIndex]}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                title="Property PDF"
                frameBorder="0"
                allowFullScreen
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50 rounded-b-lg">
              <button 
                onClick={prevPdf}
                disabled={currentPdfIndex === 0}
                className="flex items-center space-x-2 bg-[#886a4e] hover:bg-[#6d5a3f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>
              
              <span className="text-gray-600 font-medium">
                {currentPdfIndex + 1} of {pdfFiles.length}
              </span>
              
              <button 
                onClick={nextPdf}
                disabled={currentPdfIndex === pdfFiles.length - 1}
                className="flex items-center space-x-2 bg-[#886a4e] hover:bg-[#6d5a3f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
