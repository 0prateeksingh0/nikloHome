import React from 'react';

interface GuaranteedPDFViewerProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  className?: string;
}

const GuaranteedPDFViewer: React.FC<GuaranteedPDFViewerProps> = ({
  pdfUrl,
  height = '600px',
  width = '100%',
  className = ''
}) => {
  return (
    <div
      className={className}
      style={{
        height: height,
        width: width,
        minHeight: '400px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f9fafb'
      }}
    >
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0&resize=0&view=FitH`}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="PDF Viewer"
        allow="fullscreen"
        onError={(e) => {
          console.error('PDF iframe error:', e);
        }}
        onLoad={() => {
          console.log('PDF loaded successfully');
        }}
      />
    </div>
  );
};

export default GuaranteedPDFViewer;
