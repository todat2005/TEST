import React from "react";

function LoadingSpinner({ isLoading, message = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-blue-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
