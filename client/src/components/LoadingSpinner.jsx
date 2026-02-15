import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
                <p className="mt-4 text-gray-500 text-sm text-center">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
