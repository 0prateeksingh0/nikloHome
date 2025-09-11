// Test utility to verify PDF.js worker is loading correctly
export const testPDFWorker = () => {
  const workerUrl = '/flipbook/js/libs/pdf.worker.min.js';
  
  // Test if the worker file exists
  fetch(workerUrl)
    .then(response => {
      if (response.ok) {
        console.log('✅ PDF.js worker file found and accessible');
        return response.text();
      } else {
        console.error('❌ PDF.js worker file not found:', response.status);
        throw new Error(`Worker file not found: ${response.status}`);
      }
    })
    .then(content => {
      if (content && content.length > 0) {
        console.log('✅ PDF.js worker file loaded successfully, size:', content.length, 'bytes');
      } else {
        console.error('❌ PDF.js worker file is empty');
      }
    })
    .catch(error => {
      console.error('❌ Error loading PDF.js worker:', error);
    });
};

// Test if flipbook assets are accessible
export const testFlipbookAssets = () => {
  const assets = [
    '/flipbook/css/flipbook.min.css',
    '/flipbook/js/flipbook.min.js',
    '/flipbook/js/libs/pdf.min.js',
    '/flipbook/js/libs/pdf.worker.min.js',
    '/flipbook/assets/images/preloader.jpg',
    '/flipbook/assets/images/spinner.gif',
    '/flipbook/assets/mp3/turnPage.mp3'
  ];

  console.log('🧪 Testing flipbook assets...');
  
  assets.forEach(asset => {
    fetch(asset)
      .then(response => {
        if (response.ok) {
          console.log(`✅ ${asset} - OK`);
        } else {
          console.error(`❌ ${asset} - ${response.status}`);
        }
      })
      .catch(error => {
        console.error(`❌ ${asset} - Error:`, error);
      });
  });
};
