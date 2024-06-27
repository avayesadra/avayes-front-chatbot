import React from "react";

const LoadingBubbleComponent = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBubbleComponent;
