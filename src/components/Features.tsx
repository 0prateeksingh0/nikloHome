import React, { useState, useEffect, useCallback } from 'react';
import { propertyService } from '../services/property';
import type { Property } from '../types/property';
import PropertyCard from './PropertyCard';
import Pagination from './Pagination';

const Features: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await propertyService.getProperties();
      const allProperties = response.properties;
      
      // Calculate pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProperties = allProperties.slice(startIndex, endIndex);
      
      setProperties(paginatedProperties);
      setTotalItems(allProperties.length);
      setTotalPages(Math.ceil(allProperties.length / itemsPerPage));
    } catch (err: any) {
      setError('Failed to load properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Refresh properties when user comes back to the page (e.g., from admin dashboard)
  useEffect(() => {
    const handleFocus = () => {
      fetchProperties();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProperties();
      }
    };

    // Listen for storage changes (when admin updates properties)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'propertiesUpdated') {
        fetchProperties();
        localStorage.removeItem('propertiesUpdated');
      }
    };

    // Listen for custom events (same-tab communication)
    const handlePropertiesUpdated = () => {
      fetchProperties();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('propertiesUpdated', handlePropertiesUpdated);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('propertiesUpdated', handlePropertiesUpdated);
    };
  }, [fetchProperties]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section when page changes
    const element = document.getElementById('properties-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <section id="properties-section" className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6">
              Our Properties
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our premium collection of luxury properties designed for modern living
            </p>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-gray-600 text-lg">Loading properties...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Properties</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchProperties}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && (
            <>
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Properties Available</h3>
                    <p className="text-gray-600">Check back later for new property listings.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                  />
                </>
              )}
            </>
          )}
        </div>
      </section>

    </>
  );
};

export default Features;
