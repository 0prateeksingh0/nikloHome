import React from 'react';
import FlipbookViewer from '../components/FlipbookViewer';

const TestBrochure: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Brochure Test with Cloudinary PDF
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test with Cloudinary PDF URL</h2>
          <p className="text-gray-600 mb-6">
            This tests the flipbook with a PDF URL from Cloudinary. 
            Replace the URL below with your actual Cloudinary PDF URL.
          </p>
          
          {/* Replace this URL with your actual Cloudinary PDF URL */}
          <FlipbookViewer
            pdfUrl="https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample-brochure.pdf"
            lightBox={false}
            viewMode="3d"
            height="600px"
            width="100%"
            className="border rounded-lg"
          />
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to test:</h3>
            <ol className="list-decimal list-inside text-blue-800 space-y-1">
              <li>Upload a PDF to Cloudinary through admin panel</li>
              <li>Copy the PDF URL from Cloudinary</li>
              <li>Replace the URL above with your Cloudinary PDF URL</li>
              <li>The flipbook should load your PDF</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBrochure;
