import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AddPropertyForm from './AddPropertyForm';
import { propertyService } from '../services/property';
import type { Property } from '../types/property';
import AdminPropertyCard from './AdminPropertyCard';
import Pagination from './Pagination';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showPropertiesList, setShowPropertiesList] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
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
    if (showPropertiesList && isOpen && user?.role === 'admin') {
      fetchProperties();
    }
  }, [showPropertiesList, isOpen, user?.role, fetchProperties]);

  if (!isOpen || user?.role !== 'admin') return null;

  const handlePropertyCreated = () => {
    setShowAddProperty(false);
    // Refresh properties list if it's currently shown
    if (showPropertiesList) {
      fetchProperties();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePropertyUpdated = () => {
    fetchProperties();
  };

  const handlePropertyDeleted = () => {
    fetchProperties();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-4/5 max-w-6xl h-4/5 max-h-[90vh] mx-4 relative flex flex-col transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="pt-8 pb-6 px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                <p className="text-gray-600">Welcome back, <span className="font-semibold text-primary">{user?.name}</span></p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-light text-primary">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Administrator
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showAddProperty && !showPropertiesList ? (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Property Management</h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  Manage your properties, add new listings, and oversee your real estate portfolio with our comprehensive admin tools.
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-primary-light rounded-xl p-6 border border-primary-light">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-dark rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Add Property</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Create new property listings with detailed information and media.</p>
                  <button
                    onClick={() => setShowAddProperty(true)}
                    className="w-full bg-primary-dark hover:bg-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Add New Property
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">View Properties</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">View and manage all your property listings.</p>
                  <button 
                    onClick={() => setShowPropertiesList(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    View Properties
                  </button>
                </div>
              </div>
            </div>
          ) : showAddProperty ? (
            <AddPropertyForm
              onSuccess={handlePropertyCreated}
              onCancel={() => setShowAddProperty(false)}
            />
          ) : (
            /* Properties List View */
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Properties Management</h3>
                  <p className="text-gray-600">View and manage all your property listings</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPropertiesList(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Back to Dashboard
                  </button>
                  <button
                    onClick={() => setShowAddProperty(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Add New Property
                  </button>
                </div>
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Properties Found</h3>
                        <p className="text-gray-600 mb-4">Start by adding your first property listing.</p>
                        <button
                          onClick={() => setShowAddProperty(true)}
                          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Add First Property
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {properties.map((property) => (
                          <AdminPropertyCard
                            key={property.id}
                            property={property}
                            onPropertyUpdated={handlePropertyUpdated}
                            onPropertyDeleted={handlePropertyDeleted}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
