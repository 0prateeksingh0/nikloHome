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
          link.onerror = () => {
            console.error('Failed to load flipbook CSS');
          };
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
              console.log('✅ Flipbook script loaded successfully');
              console.log('🔧 jQuery after flipbook load:', !!window.jQuery);
              console.log('📚 FlipBook plugin after load:', !!window.jQuery?.fn?.flipBook);
              
              // Wait a bit for the script to fully initialize
              setTimeout(() => {
                initializeFlipbook();
              }, 100);
            };
            flipbookScript.onerror = (error) => {
              console.error('❌ Error loading flipbook script:', error);
              console.error('❌ Script src:', flipbookScript.src);
              console.error('❌ Current location:', window.location.href);
              
              if (containerRef.current) {
                containerRef.current.innerHTML = `
                  <div class="p-4 bg-red-50 text-red-800 rounded-lg">
                    <h3 class="font-semibold">Script Load Error</h3>
                    <p class="text-sm">Failed to load flipbook script from /flipbook/js/flipbook.min.js</p>
                    <p class="text-xs mt-2">Current URL: ${window.location.href}</p>
                    <p class="text-xs">Script URL: ${flipbookScript.src}</p>
                  </div>
                `;
              }
            };
            document.head.appendChild(flipbookScript);
          } else {
            console.log('✅ Flipbook script already loaded');
            initializeFlipbook();
          }
        }

        function initializeFlipbook() {
          if (containerRef.current && window.jQuery?.fn?.flipBook) {
            try {
              // Clear container
              containerRef.current.innerHTML = '';
              
              console.log('🚀 Initializing flipbook with PDF:', pdfUrl);
              console.log('📁 Container element:', containerRef.current);
              console.log('🔧 jQuery available:', !!window.jQuery);
              console.log('📚 FlipBook plugin available:', !!window.jQuery?.fn?.flipBook);
              
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
                },
                // Add error callbacks
                onError: (error: any) => {
                  console.error('❌ Flipbook error:', error);
                  if (containerRef.current) {
                    containerRef.current.innerHTML = `
                      <div class="p-4 bg-red-50 text-red-800 rounded-lg">
                        <h3 class="font-semibold">Flipbook Error</h3>
                        <p class="text-sm">${error.message || error}</p>
                      </div>
                    `;
                  }
                },
                onLoad: () => {
                  console.log('✅ Flipbook loaded successfully');
                }
              });
              
              console.log('✅ Proper flipbook initialized with PDF:', pdfUrl);
              resolve();
            } catch (error) {
              console.error('❌ Error initializing flipbook:', error);
              if (containerRef.current) {
                containerRef.current.innerHTML = `
                  <div class="p-4 bg-red-50 text-red-800 rounded-lg">
                    <h3 class="font-semibold">Initialization Error</h3>
                    <p class="text-sm">${error}</p>
                  </div>
                `;
              }
              resolve();
            }
          } else {
            console.error('❌ Missing requirements for flipbook initialization');
            if (containerRef.current) {
              containerRef.current.innerHTML = `
                <div class="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  <h3 class="font-semibold">Loading...</h3>
                  <p class="text-sm">jQuery: ${!!window.jQuery}, FlipBook: ${!!window.jQuery?.fn?.flipBook}</p>
                </div>
              `;
            }
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
