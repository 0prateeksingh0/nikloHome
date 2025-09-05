import React, { useState } from 'react';

interface BrochureViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrochureViewer: React.FC<BrochureViewerProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [currentBrochure, setCurrentBrochure] = useState(0);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">Brochures</h2>
            <div className="flex space-x-2">
              {brochures.map((brochure, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBrochure(index)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentBrochure === index
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brochure.title}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 mr-4">
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={handleResetZoom}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto bg-gray-100">
            <div 
              className="w-full h-full flex items-center justify-center p-4"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              <iframe
                src={`${brochures[currentBrochure].file}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&resize=0&view=FitH`}
                className="w-full h-[800px] border-0 rounded-lg shadow-lg"
                title={brochures[currentBrochure].name}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{brochures[currentBrochure].name}</span>
            <div className="flex items-center space-x-4">
              <span>Use mouse wheel to scroll</span>
              <span>•</span>
              <span>Click and drag to pan when zoomed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;
