import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-12 h-12 border-4 border-lime-800 border-solid rounded-full animate-spin"
        style={{ borderTopColor: 'transparent' }}
      />
    </div>
  );
};

export default LoadingSpinner;