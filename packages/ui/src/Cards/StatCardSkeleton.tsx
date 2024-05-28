import React from 'react';

const StatCardSkeleton = () => {
  return (
    <div className="bg-gray-50 shadow rounded-2xl p-6 animate-pulse">
      <div className="flex flex-row justify-between">
        <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
      </div>
      <div className="w-1/2 h-7 bg-gray-300 rounded mt-2"></div>
      <div className="w-full h-5 bg-gray-300 rounded mt-3"></div>
      <div className="w-full h-5 bg-gray-300 rounded mt-2"></div>
    </div>
  );
};

export default StatCardSkeleton;
