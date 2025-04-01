import React from 'react';
import '../assets/LoadingSpinner.css'; // Add some CSS for the spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;