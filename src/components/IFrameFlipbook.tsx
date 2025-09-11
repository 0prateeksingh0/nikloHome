import React from 'react';

interface IFrameFlipbookProps {
  pdfUrl: string;
  height?: string;
  width?: string;
  className?: string;
}

const IFrameFlipbook: React.FC<IFrameFlipbookProps> = ({
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
        overflow: 'hidden'
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
      />
    </div>
  );
};

export default IFrameFlipbook;
