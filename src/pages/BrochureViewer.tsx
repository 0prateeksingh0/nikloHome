import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlipbookViewer from '../components/FlipbookViewer';
import GuaranteedPDFViewer from '../components/GuaranteedPDFViewer';
import { propertyService } from '../services/property';
import type { Property } from '../types/property';

// Simple cache for properties
const propertyCache = new Map<string, { data: Property; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Clean up old cache entries
const cleanupCache = () => {
  const now = Date.now();
  for (const [key, value] of propertyCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      propertyCache.delete(key);
    }
  }
};

// Clean up cache every 10 minutes
setInterval(cleanupCache, 10 * 60 * 1000);

const BrochureViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setError('Property not found');
        setLoading(false);
        return;
      }

      // Check cache first
      const cached = propertyCache.get(id);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log('Using cached property data for:', id);
        if (!cached.data.brochureUrl) {
          setError('No brochure available for this property');
        } else {
          setProperty(cached.data);
        }
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching property data from API for:', id);
        const response = await propertyService.getProperty(id);
        const propertyData = response.property;
        
        if (!propertyData) {
          setError('Property not found');
        } else if (!propertyData.brochureUrl) {
          setError('No brochure available for this property');
        } else {
          // Cache the property data
          propertyCache.set(id, { data: propertyData, timestamp: now });
          setProperty(propertyData);
        }
      } catch (err) {
        setError('Failed to load property');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Fallback mechanism for PDF viewer
  useEffect(() => {
    const checkFlipbookError = () => {
      // Check if flipbook failed to load after 5 seconds
      setTimeout(() => {
        const flipbookContainer = document.querySelector('.flipbook-container');
        const fallback = document.getElementById('pdf-fallback');
        
        if (flipbookContainer && fallback) {
          // If flipbook container is empty or has error, show fallback
          if (flipbookContainer.children.length === 0 || 
              flipbookContainer.textContent?.includes('error') ||
              flipbookContainer.textContent?.includes('Error')) {
            console.log('Flipbook failed, showing fallback PDF viewer');
            fallback.style.display = 'block';
          }
        }
      }, 5000);
    };

    checkFlipbookError();
  }, [property]);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading brochure...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Brochure Not Available</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#af8c69]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {property.name} - Brochure
              </h1>
              {property.description && (
                <p className="text-sm text-gray-600 mt-1">{property.description}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <span>✕</span>
              Close
            </button>
          </div>
        </div>
      </div>

      {/* PDF Container */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Try flipbook first, fallback to guaranteed viewer */}
          <div className="relative">
            <FlipbookViewer
              pdfUrl={property.brochureUrl!}
              lightBox={false}
              viewMode="3d"
              height="calc(100vh - 120px)"
              width="100%"
              className="rounded-lg shadow-2xl bg-white"
            />
            {/* Fallback overlay that shows if flipbook fails */}
            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl" style={{ display: 'none' }} id="pdf-fallback">
              <GuaranteedPDFViewer
                pdfUrl={property.brochureUrl!}
                height="calc(100vh - 120px)"
                width="100%"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;
