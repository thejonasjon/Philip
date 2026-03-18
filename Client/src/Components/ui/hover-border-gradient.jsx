import React from "react";

export const HoverBorderGradient = ({
  children,
  onClick,
  className = "",
  containerClassName = "",
  duration = 1.5,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex overflow-hidden rounded-lg p-[2px] focus:outline-none group ${containerClassName}`}
    >
      {/* Animated gradient border - only visible on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        style={{
          background: `linear-gradient(90deg, #fb923c, #fbbf24, #f97316, #fbbf24, #fb923c)`,
          backgroundSize: "400% 400%",
          animation: `gradient-shift ${duration}s ease infinite`,
        }}
      />

      {/* Button content */}
      <span
        className={`relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-orange-500 group-hover:bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 ${className}`}
      >
        {children}
      </span>
    </button>
  );
};
