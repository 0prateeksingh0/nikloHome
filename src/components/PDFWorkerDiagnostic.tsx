import React, { useState, useEffect } from 'react';

const PDFWorkerDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runDiagnostics = async () => {
      const results: string[] = [];
      
      // Test 1: Check if we're in browser
      results.push(`🌐 Environment: ${typeof window !== 'undefined' ? 'Browser' : 'Server'}`);
      
      // Test 2: Check if PDF.js is loaded
      try {
        if ((window as any).pdfjsLib) {
          results.push(`✅ PDF.js loaded: Version ${(window as any).pdfjsLib.version || 'Unknown'}`);
        } else {
          results.push(`❌ PDF.js not loaded`);
        }
      } catch (e) {
        results.push(`❌ PDF.js error: ${e}`);
      }
      
      // Test 3: Check worker configuration
      try {
        const workerSrc = (window as any).pdfjsLib?.GlobalWorkerOptions?.workerSrc;
        results.push(`🔧 Worker Source: ${workerSrc || 'Not set'}`);
      } catch (e) {
        results.push(`❌ Worker config error: ${e}`);
      }
      
      // Test 4: Test local worker
      try {
        const response = await fetch('/flipbook/js/libs/pdf.worker.min.js', { method: 'HEAD' });
        if (response.ok) {
          results.push(`✅ Local worker accessible: ${response.status}`);
        } else {
          results.push(`❌ Local worker failed: ${response.status}`);
        }
      } catch (e) {
        results.push(`❌ Local worker error: ${e}`);
      }
      
      // Test 5: Test CDN worker
      try {
        const cdnUrl = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const response = await fetch(cdnUrl, { method: 'HEAD' });
        if (response.ok) {
          results.push(`✅ CDN worker accessible: ${response.status}`);
        } else {
          results.push(`❌ CDN worker failed: ${response.status}`);
        }
      } catch (e) {
        results.push(`❌ CDN worker error: ${e}`);
      }
      
      // Test 6: Check flipbook assets
      const assets = [
        '/flipbook/css/flipbook.min.css',
        '/flipbook/js/flipbook.min.js',
        '/flipbook/js/libs/pdf.min.js'
      ];
      
      for (const asset of assets) {
        try {
          const response = await fetch(asset, { method: 'HEAD' });
          if (response.ok) {
            results.push(`✅ ${asset}: OK`);
          } else {
            results.push(`❌ ${asset}: ${response.status}`);
          }
        } catch (e) {
          results.push(`❌ ${asset}: Error`);
        }
      }
      
      setDiagnostics(results);
      setIsLoading(false);
    };
    
    runDiagnostics();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span>Running diagnostics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-3">PDF.js Worker Diagnostics</h3>
      <div className="space-y-1">
        {diagnostics.map((diagnostic, index) => (
          <div key={index} className="text-sm font-mono">
            {diagnostic}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFWorkerDiagnostic;
