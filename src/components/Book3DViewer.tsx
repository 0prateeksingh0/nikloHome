import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

interface Book3DViewerProps {
  pdfUrl: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  zoom: number;
}

const Book3DViewer: React.FC<Book3DViewerProps> = ({ 
  pdfUrl, 
  totalPages, 
  currentPage, 
  onPageChange, 
  zoom 
}) => {
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flipBookRef.current && flipBookRef.current.pageFlip) {
        try {
          // Add 1 to account for the cover page (cover is page 0, first PDF page is page 1)
          flipBookRef.current.pageFlip().turnToPage(currentPage + 1);
        } catch (error) {
          console.warn('Error flipping page:', error);
        }
      }
    }, 100); // Small delay to ensure the flip book is initialized

    return () => clearTimeout(timer);
  }, [currentPage]);

  const createCoverPage = () => (
    <div 
      key="cover" 
      className="page cover"
      style={{ 
        width: '100%', 
        height: '100%'
      }}
    >
      <h1>Property Brochure</h1>
      <p>Interactive 3D Flip Book</p>
    </div>
  );

  const createPage = (pageNumber: number) => (
    <div 
      key={pageNumber} 
      className="page bg-white shadow-lg"
      style={{ 
        width: '100%', 
        height: '100%'
      }}
    >
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&resize=0&view=FitH&page=${pageNumber}`}
        className="w-full h-full border-0"
        title={`Page ${pageNumber}`}
      />
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl h-[600px] sm:h-[700px] md:h-[800px]"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          usePortrait={true}
          flippingTime={1000}
          drawShadow={true}
          style={{}}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          swipeDistance={30}
          renderOnlyPageLengthChange={false}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={(e) => {
            // Subtract 1 to account for the cover page (cover is page 0, first PDF page is page 1)
            const pageIndex = Math.max(0, e.data - 1);
            onPageChange(pageIndex);
          }}
          onInit={(e) => {
            console.log('Flip book initialized:', e);
          }}
          className="flip-book"
        >
          {createCoverPage()}
          {Array.from({ length: totalPages }, (_, i) => createPage(i + 1))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Book3DViewer;
