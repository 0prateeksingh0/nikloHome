import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false
}) => {
  // For now, we'll use the original image but with better CSS properties
  // In a production app, you'd want to implement actual responsive image generation
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} image-optimized`}
      style={{
        imageRendering: 'auto',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
};

export default ResponsiveImage;
