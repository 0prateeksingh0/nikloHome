import React, { useState, useEffect } from 'react';
import FlipbookViewer from '../components/FlipbookViewer';
import PDFWorkerDiagnostic from '../components/PDFWorkerDiagnostic';
import { testPDFWorker, testFlipbookAssets } from '../utils/testWorker';

const TestCloudinaryBrochure: React.FC = () => {
  const [testUrl, setTestUrl] = useState('https://res.cloudinary.com/demo/image/upload/v1234567890/sample.pdf');

  useEffect(() => {
    // Test assets when component mounts
    testFlipbookAssets();
    testPDFWorker();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Test Cloudinary Brochure Integration
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">PDF.js Worker Diagnostics</h2>
          <PDFWorkerDiagnostic />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test with Cloudinary PDF URL</h2>
          <p className="text-gray-600 mb-4">
            Enter a Cloudinary PDF URL to test the flipbook integration:
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cloudinary PDF URL:
            </label>
            <input
              type="url"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample.pdf"
            />
          </div>
          
          <div className="mb-4">
            <button
              onClick={() => setTestUrl('https://res.cloudinary.com/demo/image/upload/v1234567890/sample.pdf')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Use Demo URL
            </button>
            <button
              onClick={() => setTestUrl('https://res.cloudinary.com/demo/image/upload/v1234567890/sample.pdf')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Reset
            </button>
          </div>
        </div>

        {testUrl && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Flipbook Preview</h3>
            <div className="border rounded-lg overflow-hidden">
              <FlipbookViewer
                pdfUrl={testUrl}
                lightBox={false}
                viewMode="3d"
                height="600px"
                width="100%"
                className="border-0"
              />
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Current URL:</h4>
              <p className="text-blue-800 text-sm break-all">{testUrl}</p>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">How to test with your own PDFs:</h3>
          <ol className="list-decimal list-inside text-yellow-800 space-y-1">
            <li>Upload a PDF to Cloudinary through your admin panel</li>
            <li>Copy the PDF URL from Cloudinary (it should look like: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/properties/brochures/your-file.pdf)</li>
            <li>Paste the URL in the input field above</li>
            <li>The flipbook should load your PDF from Cloudinary</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestCloudinaryBrochure;
