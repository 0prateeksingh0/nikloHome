import React, { useState, useEffect } from 'react';

const TestVercelAssets: React.FC = () => {
  const [testResults, setTestResults] = useState<Array<{url: string, status: string, error?: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testAssets = [
    '/flipbook/css/flipbook.min.css',
    '/flipbook/js/flipbook.min.js',
    '/flipbook/js/libs/pdf.min.js',
    '/flipbook/js/libs/pdf.worker.min.js',
    '/flipbook/assets/images/preloader.jpg',
    '/flipbook/assets/images/spinner.gif',
    '/flipbook/assets/mp3/turnPage.mp3',
    '/vite.svg', // Test if basic assets work
    '/logo.png' // Test if basic assets work
  ];

  const testAllAssets = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    const results = await Promise.all(
      testAssets.map(async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          return {
            url,
            status: response.ok ? '✅ OK' : `❌ ${response.status}`,
            error: response.ok ? undefined : `HTTP ${response.status}`
          };
        } catch (error) {
          return {
            url,
            status: '❌ Error',
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );
    
    setTestResults(results);
    setIsLoading(false);
  };

  useEffect(() => {
    testAllAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Vercel Assets Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Asset Accessibility Test</h2>
          <p className="text-gray-600 mb-4">
            This page tests if all flipbook assets are accessible on Vercel deployment.
          </p>
          
          <button
            onClick={testAllAssets}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Assets Again'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Test Results</h3>
          
          {testResults.length === 0 ? (
            <p className="text-gray-500">No results yet...</p>
          ) : (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-mono text-sm">{result.url}</span>
                  <div className="text-right">
                    <div className="font-semibold">{result.status}</div>
                    {result.error && (
                      <div className="text-red-500 text-xs">{result.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">What to look for:</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• All flipbook assets should show "✅ OK"</li>
              <li>• If any show "❌ 404", the asset isn't being served by Vercel</li>
              <li>• If any show "❌ Error", there's a network/CORS issue</li>
              <li>• The PDF.js worker is the most critical asset</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVercelAssets;
