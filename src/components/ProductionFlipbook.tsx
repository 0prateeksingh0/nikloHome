import React, { useEffect, useRef, useState } from 'react';

interface ProductionFlipbookProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  className?: string;
}

declare global {
  interface Window {
    jQuery: any;
  }
}

const ProductionFlipbook: React.FC<ProductionFlipbookProps> = ({
  pdfUrl,
  height = '600px',
  width = '100%',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if we're in production
        const isProduction = process.env.NODE_ENV === 'production';
        console.log('🌍 Environment:', isProduction ? 'Production' : 'Development');

        // Load CSS first
        await loadCSS();
        
        // Load jQuery
        await loadjQuery();
        
        // Load flipbook script
        await loadFlipbookScript();
        
        setAssetsLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error loading assets:', err);
        setError(`Failed to load flipbook assets: ${err}`);
        setLoading(false);
      }
    };

    const loadCSS = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector('link[href*="flipbook.min.css"]')) {
          resolve();
          return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/flipbook/css/flipbook.min.css';
        link.onload = () => {
          console.log('✅ Flipbook CSS loaded');
          resolve();
        };
        link.onerror = () => {
          console.error('❌ Failed to load flipbook CSS');
          reject(new Error('CSS load failed'));
        };
        document.head.appendChild(link);
      });
    };

    const loadjQuery = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.jQuery) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.3.js';
        script.integrity = 'sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=';
        script.crossOrigin = 'anonymous';
        script.onload = () => {
          console.log('✅ jQuery loaded');
          resolve();
        };
        script.onerror = () => {
          console.error('❌ Failed to load jQuery');
          reject(new Error('jQuery load failed'));
        };
        document.head.appendChild(script);
      });
    };

    const loadFlipbookScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.jQuery?.fn?.flipBook) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = '/flipbook/js/flipbook.min.js';
        script.onload = () => {
          console.log('✅ Flipbook script loaded');
          // Wait for the script to fully initialize
          setTimeout(() => {
            if (window.jQuery?.fn?.flipBook) {
              resolve();
            } else {
              reject(new Error('FlipBook plugin not available after script load'));
            }
          }, 200);
        };
        script.onerror = () => {
          console.error('❌ Failed to load flipbook script');
          reject(new Error('Flipbook script load failed'));
        };
        document.head.appendChild(script);
      });
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (assetsLoaded && containerRef.current && window.jQuery?.fn?.flipBook) {
      initializeFlipbook();
    }
  }, [assetsLoaded, pdfUrl]);

  const initializeFlipbook = () => {
    if (!containerRef.current || !window.jQuery?.fn?.flipBook) {
      console.error('❌ Cannot initialize flipbook: missing requirements');
      return;
    }

    try {
      console.log('🚀 Initializing flipbook with PDF:', pdfUrl);
      
      // Clear container
      containerRef.current.innerHTML = '';
      
      // Initialize flipbook
      window.jQuery(containerRef.current).flipBook({
        pdfUrl: pdfUrl,
        viewMode: '3d',
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
        assets: {
          preloader: '/flipbook/assets/images/preloader.jpg',
          flipMp3: '/flipbook/assets/mp3/turnPage.mp3',
          spinner: '/flipbook/assets/images/spinner.gif',
          backgroundMp3: '/flipbook/assets/mp3/turnPage.mp3',
        },
        onError: (error: any) => {
          console.error('❌ Flipbook error:', error);
          setError(`Flipbook error: ${error.message || error}`);
        },
        onLoad: () => {
          console.log('✅ Flipbook loaded successfully');
          setError(null);
        }
      });
      
      console.log('✅ Flipbook initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing flipbook:', error);
      setError(`Initialization error: ${error}`);
    }
  };

  if (loading) {
    return (
      <div
        className={className}
        style={{
          height: height,
          width: width,
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading flipbook...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={className}
        style={{
          height: height,
          width: width,
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px'
        }}
      >
        <div className="text-center p-4">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h3 className="font-semibold text-red-800 mb-2">Flipbook Error</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

export default ProductionFlipbook;
