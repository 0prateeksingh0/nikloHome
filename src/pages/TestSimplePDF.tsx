import React, { useState } from 'react';
import SimpleFlipbook from '../components/SimpleFlipbook';
import IFrameFlipbook from '../components/IFrameFlipbook';

const TestSimplePDF: React.FC = () => {
  const [testUrl, setTestUrl] = useState('https://res.cloudinary.com/demo/image/upload/v1234567890/sample.pdf');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testPDF = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test if we can load the PDF directly
      const response = await fetch(testUrl);
      if (response.ok) {
        console.log('✅ PDF loaded successfully');
        setError('✅ PDF is accessible');
      } else {
        setError(`❌ PDF failed to load: ${response.status}`);
      }
    } catch (err) {
      setError(`❌ Error loading PDF: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Simple PDF Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test PDF Accessibility</h2>
          <p className="text-gray-600 mb-4">
            This tests if we can load a PDF directly without any flipbook components.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF URL:
            </label>
            <input
              type="url"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PDF URL"
            />
          </div>
          
          <button
            onClick={testPDF}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test PDF'}
          </button>
          
          {error && (
            <div className={`mt-4 p-3 rounded-md ${error.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">PDF Viewer (Simple)</h3>
          <div className="border rounded-lg overflow-hidden">
            <iframe
              src={`${testUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0`}
              className="w-full h-96"
              title="PDF Viewer"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">PDF.js Renderer (CDN Only)</h3>
          <SimpleFlipbook
            pdfUrl={testUrl}
            height="500px"
            width="100%"
            className="border rounded-lg"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">IFrame PDF Viewer (CSP Safe)</h3>
          <p className="text-gray-600 mb-4 text-sm">
            This approach doesn't use PDF.js, so it won't trigger CSP errors.
          </p>
          <IFrameFlipbook
            pdfUrl={testUrl}
            height="500px"
            width="100%"
            className="border rounded-lg"
          />
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">What this tests:</h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• If the PDF loads in the iframe, your Cloudinary URL works</li>
            <li>• If it shows an error, there's an issue with the PDF URL or CORS</li>
            <li>• This bypasses all flipbook complexity</li>
            <li>• If this works, the flipbook should work too</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestSimplePDF;
