import React, { useState, useEffect, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PDFToImagesService } from '../services/pdfToImages';

interface PDFPageImage {
  pageNumber: number;
  imageUrl: string;
}

interface PDFFlipBookProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
}

const PDFFlipBook: React.FC<PDFFlipBookProps> = ({ 
  pdfUrl, 
  isOpen, 
  onClose, 
  propertyName 
}) => {
  const [pageImages, setPageImages] = useState<PDFPageImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const flipBookRef = useRef<any>(null);

  // Load PDF pages when modal opens
  useEffect(() => {
    if (isOpen && pdfUrl) {
      loadPDFPages();
    }
  }, [isOpen, pdfUrl]);

  const loadPDFPages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use PDF.js method directly (more reliable)
      console.log('Loading PDF with PDF.js method for:', pdfUrl);
      const images = await PDFToImagesService.convertPDFToImages(pdfUrl, 20);
      console.log('PDF.js method succeeded, got', images.length, 'pages');
      setPageImages(images);
    } catch (error) {
      console.error('PDF.js method failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load PDF pages: ${errorMessage}`);
      
      // Set empty array to prevent flipbook initialization issues
      setPageImages([]);
    } finally {
      setLoading(false);
    }
  };

  const onFlip = useCallback((e: any) => {
    console.log('Current page: ' + e.data);
  }, []);

  const onInit = useCallback((e: any) => {
    console.log('FlipBook initialized:', e);
  }, []);

  const downloadPdf = async () => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${propertyName.replace(/\s+/g, '_')}_brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Fallback to direct link
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${propertyName.replace(/\s+/g, '_')}_brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-xl shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-xl">
          <h3 className="text-xl font-bold text-gray-900">
            {propertyName} - Property Brochure
          </h3>
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
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative overflow-hidden p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading brochure pages...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={loadPDFPages}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && pageImages.length > 0 && (
            <div className="flex justify-center">
              <HTMLFlipBook
                ref={flipBookRef}
                width={400}
                height={600}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={400}
                maxHeight={700}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={true}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
                className=""
                style={{}}
                startPage={0}
                showPageCorners={true}
                disableFlipByClick={false}
                onFlip={onFlip}
                onInit={onInit}
              >
                {pageImages.map((pageImage, index) => (
                  <div key={index} className="page">
                    <div className="page-content">
                      <img 
                        src={pageImage.imageUrl} 
                        alt={`Page ${pageImage.pageNumber}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          console.error(`Failed to load page ${pageImage.pageNumber}`);
                          // Hide the image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}

          {!loading && !error && pageImages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">No pages available</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .page {
          background: white;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .page-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .page img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
};

export default PDFFlipBook;
