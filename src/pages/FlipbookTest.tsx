import React from 'react';
import FlipbookViewer from '../components/FlipbookViewer';

const FlipbookTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Flipbook Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test with Sample PDF</h2>
          <p className="text-gray-600 mb-6">
            This page tests the flipbook component with a sample PDF from the plugin.
          </p>
          
          <FlipbookViewer
            pdfUrl="/flipbook/assets/pdf/4page.pdf"
            lightBox={false}
            viewMode="3d"
            height="600px"
            width="100%"
            className="border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FlipbookTest;
