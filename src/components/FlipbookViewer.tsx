import React, { useEffect, useRef } from 'react';

interface FlipbookViewerProps {
  pdfUrl: string;
  lightBox?: boolean;
  viewMode?: '3d' | '2d' | 'swipe' | 'scroll' | 'webgl';
  height?: string;
  width?: string;
  className?: string;
}

declare global {
  interface Window {
    FlipBook: any;
    jQuery: any;
  }
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  pdfUrl,
  lightBox = false,
  viewMode = '3d',
  height = '600px',
  width = '100%',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipbookInstance = useRef<any>(null);

  useEffect(() => {
    // Load CSS if not already loaded
    if (!document.querySelector('link[href*="flipbook.min.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/flipbook/css/flipbook.min.css';
      document.head.appendChild(link);
    }

    // Load jQuery if not already loaded
    if (!window.jQuery) {
      const script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.3.js';
      script.integrity = 'sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Load flipbook script if not already loaded
    if (!window.FlipBook && !window.jQuery?.fn?.flipBook) {
      const script = document.createElement('script');
      script.src = '/flipbook/js/flipbook.min.js';
      document.head.appendChild(script);
    }

    const initializeFlipbook = () => {
      if (!containerRef.current) return;

      // Clean up existing instance
      if (flipbookInstance.current) {
        try {
          flipbookInstance.current.destroy?.();
        } catch (e) {
          console.warn('Error destroying flipbook:', e);
        }
      }

      const options = {
        pdfUrl: pdfUrl,
        lightBox: lightBox,
        viewMode: viewMode,
        backgroundColor: '#af8c69',
        sound: true,
        menuOverBook: false,
        menuFloating: false,
        skin: 'light',
        skinColor: '#222',
        skinBackground: '#FFF',
        btnColor: '#FFF',
        btnBackground: '#00000055',
        btnSize: 18,
        btnRadius: 2,
        btnMargin: 2,
        btnPaddingV: 10,
        btnPaddingH: 10,
        thumbSize: 150,
        loadAllPages: false,
        loadPagesF: 2,
        loadPagesB: 1,
        autoplayOnStart: false,
        autoplayInterval: 3000,
        autoplayLoop: true,
        rightToLeft: false,
        startPage: 0,
        deeplinkingEnabled: false,
        tableOfContentCloseOnClick: true,
        thumbsCloseOnClick: true,
        thumbsStyle: 'overlay',
        pdfjsworkerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`, // Use CDN worker for Vercel
        pdfjsSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js`, // Use CDN PDF.js for Vercel
        disableRange: false, // Enable range requests for better PDF loading
        disableStream: false, // Enable streaming for better performance
        assets: {
          preloader: '/flipbook/assets/images/preloader.jpg',
          flipMp3: '/flipbook/assets/mp3/turnPage.mp3',
          spinner: '/flipbook/assets/images/spinner.gif',
          backgroundMp3: '/flipbook/assets/mp3/turnPage.mp3', // Use turnPage.mp3 as background
        }
      };

      // Try jQuery method first, then vanilla JS
      if (window.jQuery?.fn?.flipBook) {
        flipbookInstance.current = window.jQuery(containerRef.current).flipBook(options);
      } else if (window.FlipBook) {
        flipbookInstance.current = new window.FlipBook(containerRef.current, options);
      } else {
        console.error('FlipBook library not loaded');
      }
    };

    // Wait for scripts to load
    const checkAndInit = () => {
      if (window.jQuery?.fn?.flipBook || window.FlipBook) {
        initializeFlipbook();
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    // Start checking after a short delay
    setTimeout(checkAndInit, 500);

    return () => {
      if (flipbookInstance.current) {
        try {
          flipbookInstance.current.destroy?.();
        } catch (e) {
          console.warn('Error destroying flipbook:', e);
        }
      }
    };
  }, [pdfUrl, lightBox, viewMode]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: height,
        width: width,
        minHeight: '400px'
      }}
    />
  );
};

export default FlipbookViewer;
