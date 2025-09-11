import React, { useEffect, useRef } from 'react';

interface ProperFlipbookProps {
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

const ProperFlipbook: React.FC<ProperFlipbookProps> = ({
  pdfUrl,
  height = '600px',
  width = '100%',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScripts = () => {
      return new Promise<void>((resolve) => {
        // Load CSS
        if (!document.querySelector('link[href*="flipbook.min.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/flipbook/css/flipbook.min.css';
          document.head.appendChild(link);
        }

        // Load jQuery
        if (!window.jQuery) {
          const jqueryScript = document.createElement('script');
          jqueryScript.src = 'https://code.jquery.com/jquery-3.6.3.js';
          jqueryScript.integrity = 'sha256-nQLuAZGRRcILA+6dMBOvcRh5Pe310sBpanc6+QBmyVM=';
          jqueryScript.crossOrigin = 'anonymous';
          jqueryScript.onload = () => {
            loadFlipbookScript();
          };
          document.head.appendChild(jqueryScript);
        } else {
          loadFlipbookScript();
        }

        function loadFlipbookScript() {
          // Load flipbook script
          if (!window.jQuery?.fn?.flipBook) {
            const flipbookScript = document.createElement('script');
            flipbookScript.src = '/flipbook/js/flipbook.min.js';
            flipbookScript.onload = () => {
              initializeFlipbook();
            };
            document.head.appendChild(flipbookScript);
          } else {
            initializeFlipbook();
          }
        }

        function initializeFlipbook() {
          if (containerRef.current && window.jQuery?.fn?.flipBook) {
            // Clear container
            containerRef.current.innerHTML = '';
            
            // Initialize flipbook exactly like the examples
            window.jQuery(containerRef.current).flipBook({
              pdfUrl: pdfUrl,
              // Use the same options as the working examples
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
              // Use the build folder structure
              assets: {
                preloader: '/flipbook/assets/images/preloader.jpg',
                flipMp3: '/flipbook/assets/mp3/turnPage.mp3',
                spinner: '/flipbook/assets/images/spinner.gif',
                backgroundMp3: '/flipbook/assets/mp3/turnPage.mp3',
              }
            });
            
            console.log('✅ Proper flipbook initialized with PDF:', pdfUrl);
            resolve();
          }
        }
      });
    };

    loadScripts();
  }, [pdfUrl]);

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

export default ProperFlipbook;
