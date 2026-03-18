import React from "react";

function TestimonialsList({ testimonials = [] }) {
  if (testimonials.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No testimonials yet. Be the first to share!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <div
          key={t._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between h-full"
        >
          {/* Review text */}
          <p className="text-gray-700 italic mb-6 leading-relaxed line-clamp-none flex-grow">
            "{t.message || t.text}"
          </p>

          {/* User info - Name, Country, Profession */}
          <div className="flex items-start border-t pt-4 mt-auto gap-3">
            <img
              src={
                t.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  t.name
                )}&background=f97316&color=fff&size=128`
              }
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-400 flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-gray-800 text-lg mb-1">
                {t.name}
              </p>
              {t.country && (
                <p className="text-sm text-gray-600 mb-1">📍 {t.country}</p>
              )}
              <p className="text-sm text-orange-600 font-medium">
                {t.profession || "Student"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestimonialsList;
