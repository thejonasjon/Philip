import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CreateTestimonial } from "../services/api";

function TestimonialForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    country: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://philip-portfolio-q0iw.onrender.com/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.name,
    )}&background=f97316&color=fff&size=128`;

    const newTestimonial = {
      name: formData.name,
      email: formData.email,
      profession: formData.profession || "Student",
      country: formData.country || "",
      text: formData.text,
      // image: imageUrl,
    };

    try {
      setLoading(true);

      await CreateTestimonial(newTestimonial);

      toast.success("Testimonial submitted successfully!");

      setFormData({
        name: "",
        email: "",
        profession: "",
        country: "",
        text: "",
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit testimonial!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Share Your Testimonial
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Profession */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Profession (optional)
          </label>
          <input
            type="text"
            name="profession"
            placeholder="Your profession or field"
            value={formData.profession}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Country (optional)
          </label>
          <input
            type="text"
            name="country"
            placeholder="Enter your country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Message
          </label>
          <textarea
            name="text"
            placeholder="Write your message..."
            value={formData.text}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full cursor-pointer py-3 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
}

export default TestimonialForm;
