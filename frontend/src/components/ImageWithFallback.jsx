import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [error, setError] = useState(false);
  
  return error ? (
    <div 
      style={{
        width: props.width || '100%',
        height: props.height || '200px',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}
    >
      {alt || 'Image Unavailable'}
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;