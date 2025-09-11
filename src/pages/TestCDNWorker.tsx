import React, { useState, useEffect } from 'react';

const TestCDNWorker: React.FC = () => {
  const [testResults, setTestResults] = useState<Array<{name: string, status: string, url: string}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testCDNSources = async () => {
      const sources = [
        {
          name: 'Cloudflare CDN Worker',
          url: '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        },
        {
          name: 'JSDelivr CDN Worker',
          url: '//cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
        },
        {
          name: 'Cloudflare CDN PDF.js',
          url: '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
        },
        {
          name: 'JSDelivr CDN PDF.js',
          url: '//cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js'
        }
      ];

      const results = await Promise.all(
        sources.map(async (source) => {
          try {
            const response = await fetch(source.url, { method: 'HEAD' });
            return {
              name: source.name,
              status: response.ok ? '✅ OK' : `❌ ${response.status}`,
              url: source.url
            };
          } catch (error) {
            return {
              name: source.name,
              status: '❌ Error',
              url: source.url
            };
          }
        })
      );

      setTestResults(results);
      setIsLoading(false);
    };

    testCDNSources();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span>Testing CDN sources...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          CDN Worker Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">PDF.js CDN Sources Test</h2>
          <p className="text-gray-600 mb-6">
            This tests if the CDN sources we're using for PDF.js are accessible.
          </p>
          
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{result.name}</div>
                  <div className="text-sm text-gray-600 font-mono">{result.url}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{result.status}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">What this means:</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• If any worker shows "✅ OK", your flipbook will work</li>
              <li>• The app will automatically use the first working source</li>
              <li>• CDN sources are more reliable than local files on Vercel</li>
              <li>• Your Cloudinary PDFs will work regardless of worker source</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCDNWorker;
