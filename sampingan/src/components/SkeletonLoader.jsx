import React from "react";

const SkeletonLoader = () => {
    return (
        <>
                <div className="w-72">
                    <div className="max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="animate-pulse">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-4">
                                <div className="h-6 bg-gray-300 mb-6"></div>
                                <div className="h-4 bg-gray-300 w-2/3 mb-3"></div>
                                <div className="h-4 bg-gray-300 w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default SkeletonLoader;