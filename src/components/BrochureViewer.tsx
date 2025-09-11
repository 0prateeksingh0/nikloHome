import React, { useState, useEffect } from 'react';
import Book3DViewer from './Book3DViewer';

interface BrochureViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrochureViewer: React.FC<BrochureViewerProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [currentBrochure, setCurrentBrochure] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookMode, setIsBookMode] = useState(true); // Default to book mode
  const [totalPages, setTotalPages] = useState(44); // Default total pages

  const brochures = [
    {
      name: "Grand View Brochure",
      file: "/pdf/broucher1.pdf",
      title: "GRAND VIEW"
    },
    {
      name: "Property 1 Brochure", 
      file: "/pdf/property1.pdf",
      title: "PROPERTY 1"
    },
    {
      name: "Property 2 Brochure",
      file: "/pdf/property2.pdf", 
      title: "PROPERTY 2"
    }
  ];

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = brochures[currentBrochure].file;
    link.download = brochures[currentBrochure].name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleBookMode = () => {
    setIsBookMode(!isBookMode);
    setCurrentPage(0);
  };

  // Initialize to middle page when brochure changes
  useEffect(() => {
    const middlePage = Math.floor(totalPages / 2);
    setCurrentPage(middlePage);
  }, [currentBrochure, totalPages]);

  // Update total pages based on brochure (you can customize this per brochure)
  useEffect(() => {
    const pageCounts = [44, 20, 30]; // Page counts for each brochure
    setTotalPages(pageCounts[currentBrochure] || 44);
  }, [currentBrochure]);

  // Keyboard navigation for normal mode
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isBookMode) return; // 3D book handles its own navigation
      
      if (event.key === 'ArrowLeft') {
        setCurrentPage(prev => Math.max(0, prev - 1));
      } else if (event.key === 'ArrowRight') {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, isBookMode, currentPage, totalPages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-gray-200 space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Brochures</h2>
            <div className="flex flex-wrap gap-2">
              {brochures.map((brochure, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBrochure(index)}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    currentBrochure === index
                      ? 'bg-[#253747] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brochure.title}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            {/* Book Mode Toggle */}
            <button
              onClick={toggleBookMode}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${
                isBookMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-medium hidden sm:inline">
                {isBookMode ? 'Book Mode' : 'Normal View'}
              </span>
              <span className="font-medium sm:hidden">
                {isBookMode ? 'Book' : 'Normal'}
              </span>
            </button>

            {/* Page Counter (only in book mode) */}
            {isBookMode && (
              <div className="flex items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-[60px] sm:min-w-[100px] text-center">
                  {currentPage + 1}/{totalPages}
                </span>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Zoom Out"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-xs sm:text-sm font-medium text-gray-700 min-w-[40px] sm:min-w-[60px] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Zoom In"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 bg-[#253747] hover:bg-[#1a2a35] text-white rounded-md transition-colors text-xs sm:text-sm"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">DL</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Close"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto bg-gray-100">
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
              {isBookMode ? (
                <Book3DViewer
                  pdfUrl={brochures[currentBrochure].file}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  zoom={zoom}
                />
              ) : (
                <div 
                  className="w-full max-w-4xl"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  <iframe
                    src={`${brochures[currentBrochure].file}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&resize=0&view=FitH`}
                    className="w-full h-[400px] sm:h-[600px] md:h-[800px] border-0 rounded-lg shadow-lg"
                    title={brochures[currentBrochure].name}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 sm:p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
            <span className="truncate">{brochures[currentBrochure].name}</span>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
              {isBookMode ? (
                <>
                  <span className="hidden sm:inline">Click and drag pages to flip</span>
                  <span className="sm:hidden">Drag pages to flip</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Page {currentPage + 1} of {totalPages}</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Use mouse wheel to scroll</span>
                  <span className="sm:hidden">Scroll to navigate</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Click and drag to pan when zoomed</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;
