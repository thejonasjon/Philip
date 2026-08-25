import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import Scheldule from "../assets/scheldule.png";
import { CreateTestimonial } from "../services/api";

export default function ReviewModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    country: "",
    text: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error once user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.profession.trim()) {
      newErrors.profession = "Please enter your profession.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Please enter your country.";
    }

    if (!formData.text.trim()) {
      newErrors.text = "Please enter your review.";
    } else if (formData.text.trim().length < 10) {
      newErrors.text = "Your review should be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTestimonial = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      profession: formData.profession.trim(),
      country: formData.country.trim(),
      text: formData.text.trim(),
    };

    try {
      setLoading(true);

      await CreateTestimonial(newTestimonial);
      onSuccess();

      toast.success("Review submitted successfully!");

      setFormData({
        name: "",
        email: "",
        profession: "",
        country: "",
        text: "",
      });

      setErrors({});

      onClose();
    } catch (error) {
      console.error("Failed to submit testimonial:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = (
    <>
      {/* Name */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          Your name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none transition-colors ${
            errors.name
              ? "border-red-400"
              : "border-[#0145A814] focus:border-[#0245a8]"
          }`}
        />

        {errors.name && (
          <span className="text-xs text-red-500">{errors.name}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none transition-colors ${
            errors.email
              ? "border-red-400"
              : "border-[#0145A814] focus:border-[#0245a8]"
          }`}
        />

        {errors.email && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}
      </div>

      {/* Profession */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          Profession
        </label>

        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          placeholder="Enter your profession"
          className={`rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none transition-colors ${
            errors.profession
              ? "border-red-400"
              : "border-[#0145A814] focus:border-[#0245a8]"
          }`}
        />

        {errors.profession && (
          <span className="text-xs text-red-500">{errors.profession}</span>
        )}
      </div>

      {/* Country */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          Country
        </label>

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Enter your country"
          className={`rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none transition-colors ${
            errors.country
              ? "border-red-400"
              : "border-[#0145A814] focus:border-[#0245a8]"
          }`}
        />

        {errors.country && (
          <span className="text-xs text-red-500">{errors.country}</span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          Your Message
        </label>

        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Enter your review"
          className={`h-25 md:h-50 resize-none rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none transition-colors ${
            errors.text
              ? "border-red-400"
              : "border-[#0145A814] focus:border-[#0245a8]"
          }`}
        />

        {errors.text && (
          <span className="text-xs text-red-500">{errors.text}</span>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 md:py-4 text-base font-medium leading-6.5 text-[#F7F4EF] ${
          loading ? "cursor-not-allowed bg-[#0245a8]/50" : "bg-[#0245a8]"
        }`}
      >
        {loading ? "Sending..." : "Send Review"}
      </Button>
    </>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 md:px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative max-h-[90vh] w-full max-w-11/12 overflow-y-auto rounded-xl md:rounded-3xl bg-white p-0 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-8 md:right-6 md:top-6 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          aria-label="Close review modal"
        >
          <X size={20} className="text-[#222222]" />
        </button>

        {/* Mobile - gradient card with form inset on top */}
        <form
          onSubmit={handleSubmit}
          className="md:hidden relative overflow-hidden rounded-xl md:rounded-3xl p-4 pt-16"
          style={{
            background:
              "linear-gradient(78.97deg, rgba(28,28,126,0.8) 9.02%, rgba(139,143,168,0.8) 43.05%, rgba(218,85,72,0.4) 63.19%, rgba(218,85,72,0.64) 102.35%)",
          }}
        >
          <h4 className="relative z-10 mb-3 max-w-60 md:w-full md:mb-6 text-[28px] font-medium leading-tight text-[#F7F4EF]">
            Send a Review to Tutor Philips
          </h4>

          <div className="relative z-10 flex flex-col gap-2 md:gap-4 rounded-xl md:rounded-3xl bg-white p-6">
            {fields}
          </div>
        </form>

        {/* Desktop - Original side-by-side layout (unchanged) */}
        <div className="hidden md:grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left */}
          <div
            className="relative min-h-180 overflow-hidden rounded-3xl border-[0.2px] border-[#00000033] px-10 py-12 md:px-15 md:py-15"
            style={{
              background:
                "linear-gradient(78.97deg, rgba(28,28,126,0.8) 9.02%, rgba(139,143,168,0.8) 43.05%, rgba(218,85,72,0.4) 63.19%, rgba(218,85,72,0.64) 102.35%)",
            }}
          >
            <h4 className="relative z-10 max-w-80 text-[42px] font-medium leading-tight text-[#F7F4EF] md:text-[56px] md:leading-20">
              Send a Review to Tutor Philips
            </h4>

            <div className="absolute -right-60 top-100 w-125 md:-right-28 md:top-200 md:max-w-450">
              <img
                src={Scheldule}
                alt=""
                className="h-full w-full scale-300 object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center px-2 py-6 md:px-6"
          >
            <div className="flex flex-col gap-3 md:gap-4">{fields}</div>
          </form>
        </div>
      </div>
    </div>
  );
}