
import React from 'react';

const UnauthenticatedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-sky-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You must be logged in</h1>
        <p className="text-lg mb-8">Please <a href="/login" className="text-blue-500">login</a> to access this page.</p>
      </div>
    </div>
  );
};

export default UnauthenticatedPage;
