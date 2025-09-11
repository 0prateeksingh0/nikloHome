import React, { useState, useEffect } from 'react';
import type { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentProperty, setCurrentProperty] = useState(property);

  // Update local state when property prop changes
  useEffect(() => {
    setCurrentProperty(property);
  }, [property]);


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
              <span className="bg-[#2A3B49] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {currentProperty.availableApartments} Available
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#2A3B49] mb-2 group-hover:text-primary transition-colors duration-300">
              {currentProperty.name}
            </h3>
            <div className="flex items-center text-[#2A3B49] mb-3">
              <svg className="w-4 h-4 mr-2 text-[#2A3B49]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base">{currentProperty.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {currentProperty.brochureUrl ? (
              <a 
                href={`/brochure/${currentProperty.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2A3B49] hover:bg-[#1e2a35] text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Brochure
              </a>
            ) : (
              <button 
                className="flex-1 bg-gray-400 text-white px-4 py-3 rounded-lg cursor-not-allowed flex items-center justify-center"
                disabled
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                No Brochure
              </button>
            )}
          </div>

        </div>
      </div>

    </>
  );
};

export default PropertyCard;
