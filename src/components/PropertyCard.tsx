import React, { useState, useEffect } from 'react';
import type { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(property);

  // Update local state when property prop changes
  useEffect(() => {
    setCurrentProperty(property);
  }, [property]);

  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const downloadPdf = async () => {
    if (currentProperty.brochure) {
      try {
        // Fetch the PDF file
        const response = await fetch(currentProperty.brochure);
        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
        
        // Convert to blob
        const blob = await response.blob();
        
        // Create object URL
        const url = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentProperty.name.replace(/\s+/g, '_')}_brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error);
        // Fallback to direct link if fetch fails
        const link = document.createElement('a');
        link.href = currentProperty.brochure;
        link.download = `${currentProperty.name.replace(/\s+/g, '_')}_brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return 'bg-red-500 text-white';
      case 'available':
        return 'bg-green-500 text-white';
      case 'in_process':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return 'SOLD';
      case 'available':
        return 'AVAILABLE';
      case 'in_process':
        return 'IN PROCESS';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          {currentProperty.image ? (
            <img 
              src={currentProperty.image} 
              alt={currentProperty.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusColor(currentProperty.status)}`}>
              {getStatusText(currentProperty.status)}
            </span>
          </div>

          {/* Available Apartments Badge */}
          {currentProperty.availableApartments > 0 && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {currentProperty.availableApartments} Available
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
              {currentProperty.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
              <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base">{currentProperty.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {currentProperty.brochure && (
              <button 
                onClick={openPdfModal}
                className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </button>
            )}
          </div>

          {/* Download Button */}
          {currentProperty.brochure && (
            <button 
              onClick={downloadPdf}
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Brochure
            </button>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      {isPdfModalOpen && currentProperty.brochure && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-xl shadow-2xl relative flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-900">{currentProperty.name} - Property Details</h3>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={downloadPdf}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                  title="Download PDF"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                <button 
                  onClick={closePdfModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={`${currentProperty.brochure}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                title={`${currentProperty.name} PDF`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
