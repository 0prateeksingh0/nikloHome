import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';

interface Model3DViewerProps {
  modelUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Model Component
function Model({ url }: { url: string }) {

  // Check file extension to determine how to handle the model
  const getFileExtension = (url: string) => {
    return url.split('.').pop()?.toLowerCase() || '';
  };

  const fileExtension = getFileExtension(url);

  // For unsupported file types (like .rvt), show a message
  if (fileExtension === 'rvt' || !['glb', 'gltf', 'obj', 'fbx'].includes(fileExtension)) {
    return (
      <Html center>
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Model Preview Not Available</h3>
          <p className="text-gray-600 mb-4">
            {fileExtension === 'rvt' 
              ? 'Revit (.rvt) files cannot be previewed in the browser. Please download the file to view in Revit software.'
              : `File type .${fileExtension} is not supported for 3D preview.`
            }
          </p>
          <a
            href={url}
            download
            className="inline-flex items-center px-4 py-2 bg-[#253747] text-white rounded-lg hover:bg-[#1a2a35] transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download File
          </a>
        </div>
      </Html>
    );
  }

  // For supported file types, we'll show a placeholder since we removed useGLTF
  // In a real implementation, you'd load the model based on file type
  return (
    <Html center>
      <div className="text-center">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Model Preview</h3>
        <p className="text-gray-600 mb-4">
          Preview for .{fileExtension} files is not yet implemented. You can download the file to view it in appropriate software.
        </p>
        <a
          href={url}
          download
          className="inline-flex items-center px-4 py-2 bg-[#253747] text-white rounded-lg hover:bg-[#1a2a35] transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download File
        </a>
      </div>
    </Html>
  );
}

// Loading component
function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#253747]"></div>
        <span className="ml-2 text-[#253747]">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

// Error component
function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <Html center>
      <div className="text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load 3D Model</h3>
        <p className="text-gray-600 mb-4">This 3D model format may not be supported or the file is corrupted.</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#253747] text-white rounded-lg hover:bg-[#1a2a35] transition-colors"
        >
          Try Again
        </button>
      </div>
    </Html>
  );
}

const Model3DViewer: React.FC<Model3DViewerProps> = ({ modelUrl, isOpen, onClose }) => {
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setHasError(false);
    // Force re-render by updating the key
    setTimeout(() => setIsRetrying(false), 100);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">3D Model Viewer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3D Viewer */}
        <div className="h-[70vh] relative">
          {hasError ? (
            <ErrorFallback onRetry={handleRetry} />
          ) : (
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Environment preset="sunset" />
                <Model key={isRetrying ? Date.now() : modelUrl} url={modelUrl} />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={1}
                  maxDistance={10}
                />
              </Suspense>
            </Canvas>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>• Use mouse to rotate, zoom, and pan</p>
              <p>• Scroll to zoom in/out</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model3DViewer;
