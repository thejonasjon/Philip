import { useEffect, useState } from "react";
import TestimonialsList from "./Components/TestimonialsList";
import TestimonialForm from "./Components/TestimonialForm";
import { Link } from "react-router-dom";
import axios from "axios";
import { FetchTestimonies } from "./services/api";

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);

  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await FetchTestimonies();
        setTestimonies(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://philip-portfolio-q0iw.onrender.com/api";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/testimonials`);
        setTestimonials(res.data);
      } catch (err) {
        console.error("❌ Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, [API_BASE_URL]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            All Testimonials
          </h2>
          <p className="text-gray-600 text-lg">
            See what my students have to say
          </p>
          {testimonials.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {testimonials.length}{" "}
              {testimonials.length === 1 ? "testimonial" : "testimonials"}
            </p>
          )}
        </div>

        {/* ✅ List of testimonials */}
        <TestimonialsList testimonials={testimonies} />

        {/* ✅ Add testimonial form */}
        <div className="mt-16">
          <TestimonialForm />
        </div>

        {/* ✅ Back to Home Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};