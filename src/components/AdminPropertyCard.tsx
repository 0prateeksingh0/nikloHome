import React, { useState, useEffect } from 'react';
import type { Property } from '../types/property';
import { propertyService } from '../services/property';

interface AdminPropertyCardProps {
  property: Property;
  onPropertyUpdated: () => void;
  onPropertyDeleted: () => void;
}

const AdminPropertyCard: React.FC<AdminPropertyCardProps> = ({ 
  property, 
  onPropertyUpdated, 
  onPropertyDeleted 
}) => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(property);
  const [isUpdatingApartments, setIsUpdatingApartments] = useState(false);
  const [apartmentsInput, setApartmentsInput] = useState(property.availableApartments.toString());

  // Update local state when property prop changes
  useEffect(() => {
    setCurrentProperty(property);
    setApartmentsInput(property.availableApartments.toString());
  }, [property]);

  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  const downloadPdf = async () => {
    if (currentProperty.brochureUrl) {
      try {
        // Fetch the PDF file
        const response = await fetch(currentProperty.brochureUrl);
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
        link.href = currentProperty.brochureUrl;
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

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === currentProperty.status) return;
    
    try {
      setIsUpdating(true);
      await propertyService.updateProperty(currentProperty.id, { status: newStatus as 'available' | 'in_process' | 'sold' });
      
      // Update local state immediately for instant UI feedback
      setCurrentProperty(prev => ({
        ...prev,
        status: newStatus as 'available' | 'in_process' | 'sold'
      }));
      
      // Also call the parent callback to refresh the list
      onPropertyUpdated();
      
      // Notify other components that properties have been updated
      localStorage.setItem('propertiesUpdated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('propertiesUpdated'));
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Failed to update property status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApartmentsUpdate = async () => {
    const newCount = parseInt(apartmentsInput);
    
    // Validate input
    if (isNaN(newCount) || newCount < 0) {
      alert('Please enter a valid number (0 or greater)');
      setApartmentsInput(currentProperty.availableApartments.toString());
      return;
    }
    
    if (newCount === currentProperty.availableApartments) return;
    
    try {
      setIsUpdatingApartments(true);
      await propertyService.updateProperty(currentProperty.id, { availableApartments: newCount });
      
      // Update local state immediately for instant UI feedback
      setCurrentProperty(prev => ({
        ...prev,
        availableApartments: newCount
      }));
      
      // Also call the parent callback to refresh the list
      onPropertyUpdated();
      
      // Notify other components that properties have been updated
      localStorage.setItem('propertiesUpdated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('propertiesUpdated'));
    } catch (error) {
      console.error('Error updating available apartments:', error);
      alert('Failed to update available apartments. Please try again.');
      setApartmentsInput(currentProperty.availableApartments.toString());
    } finally {
      setIsUpdatingApartments(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await propertyService.deleteProperty(currentProperty.id);
      onPropertyDeleted();
      
      // Notify other components that properties have been updated
      localStorage.setItem('propertiesUpdated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('propertiesUpdated'));
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
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
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(currentProperty.status)}`}>
              {getStatusText(currentProperty.status)}
            </span>
          </div>

          {/* 3D Model Badge */}
          {currentProperty.model3d && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                3D Model
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
              {currentProperty.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{currentProperty.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm">{currentProperty.availableApartments} apartments available</span>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="space-y-3">
            {/* Status Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Update Status:</label>
              <select
                value={currentProperty.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                disabled={isUpdating}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="available">Available</option>
                <option value="in_process">In Process</option>
                <option value="sold">Sold</option>
              </select>
              {isUpdating && (
                <p className="text-blue-500 text-sm mt-1">Updating status...</p>
              )}
            </div>

            {/* Available Apartments Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Apartments:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  value={apartmentsInput}
                  onChange={(e) => setApartmentsInput(e.target.value)}
                  disabled={isUpdatingApartments}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter number of apartments"
                />
                <button
                  onClick={handleApartmentsUpdate}
                  disabled={isUpdatingApartments || apartmentsInput === currentProperty.availableApartments.toString()}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isUpdatingApartments ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
              {isUpdatingApartments && (
                <p className="text-blue-500 text-sm mt-1">Updating apartments count...</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {currentProperty.brochureUrl && (
                <button 
                  onClick={openPdfModal}
                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Brochure
                </button>
              )}
              
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>

            {/* Download Button */}
            {currentProperty.brochureUrl && (
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Property</h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>"{currentProperty.name}"</strong>? This will permanently remove the property and all its data.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Property'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {isPdfModalOpen && currentProperty.brochureUrl && (
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
                src={`${currentProperty.brochureUrl}#toolbar=0&navpanes=0&scrollbar=0`}
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

export default AdminPropertyCard;
