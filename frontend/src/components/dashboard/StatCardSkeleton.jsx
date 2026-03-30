import React from "react";

const StatCardSkeleton = () => {
  return (
    <div className="rounded-xl border bg-white p-5 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
