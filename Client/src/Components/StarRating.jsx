import React from "react";

function StarRating({ rating, onChange }) {
  return (
    <div className="flex space-x-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          className={
            star <= rating
              ? "text-yellow-500 text-2xl"
              : "text-gray-300 text-2xl"
          }
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;
