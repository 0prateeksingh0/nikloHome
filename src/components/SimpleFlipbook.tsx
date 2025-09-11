import React, { useEffect, useRef } from 'react';

interface SimpleFlipbookProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  className?: string;
}

const SimpleFlipbook: React.FC<SimpleFlipbookProps> = ({
  pdfUrl,
  height = '600px',
  width = '100%',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load PDF.js from CDN
    const loadPDFJS = () => {
      return new Promise((resolve, reject) => {
        if ((window as any).pdfjsLib) {
          resolve((window as any).pdfjsLib);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
          // Configure worker
          (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve((window as any).pdfjsLib);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadPDF = async () => {
      try {
        console.log('🔄 Loading PDF.js...');
        const pdfjsLib = await loadPDFJS() as any;
        console.log('✅ PDF.js loaded successfully');
        
        console.log('🔄 Loading PDF from:', pdfUrl);
        // Load PDF
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
        });
        
        const pdf = await loadingTask.promise;
        console.log('✅ PDF loaded:', pdf.numPages, 'pages');
        
        // Render first page
        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          
          await page.render(renderContext).promise;
          console.log('✅ Page rendered successfully');
          
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(canvas);
          }
        } else {
          throw new Error('Could not get canvas context');
        }
      } catch (error) {
        console.error('❌ Error loading PDF:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-4 bg-red-50 text-red-800 rounded-lg">
              <h3 class="font-semibold">Error loading PDF</h3>
              <p class="text-sm">${error}</p>
              <p class="text-xs mt-2">URL: ${pdfUrl}</p>
            </div>
          `;
        }
      }
    };

    loadPDF();
  }, [pdfUrl]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: height,
        width: width,
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#f9fafb'
      }}
    >
      <div className="text-gray-500">Loading PDF...</div>
    </div>
  );
};

export default SimpleFlipbook;
