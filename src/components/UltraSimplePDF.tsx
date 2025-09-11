import React from 'react';

interface UltraSimplePDFProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  className?: string;
}

const UltraSimplePDF: React.FC<UltraSimplePDFProps> = ({
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
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
    >
      <iframe
        src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&statusbar=0&messages=0&scrollbar=1&resize=0&view=FitH`}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="PDF Viewer"
        allow="fullscreen"
        sandbox="allow-same-origin allow-scripts allow-forms allow-downloads"
      />
    </div>
  );
};

export default UltraSimplePDF;
