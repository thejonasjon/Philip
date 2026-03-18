import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://formspree.io/f/myznqzrv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "✅ Message sent successfully! We'll get back to you soon."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("❌ Error sending message:", err);
      toast.error(
        "Failed to send message. Please try again or email us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-900 relative overflow-hidden"
    >
      {/* Flowing golden lines background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M-100 200 Q300 100 600 200 T1200 150"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100 300 Q400 200 700 300 T1300 250"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 400 Q250 350 500 400 T1200 380"
            stroke="url(#gradient1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-100 500 Q350 450 650 500 T1250 480"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100 600 Q200 550 600 600 T1100 580"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            If you want to book a class or make further enquiries about the
            tutor sessions, kindly fill out the form below and we will get back
            to you as soon as possible.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-gray-700 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="What's your Name?"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-sm transition-all duration-300"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-sm transition-all duration-300"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none shadow-sm transition-all duration-300"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full font-semibold px-6 py-3 rounded-lg transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 shadow-md ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "cursor-pointer bg-amber-400 hover:bg-amber-500 text-gray-900 transform hover:scale-105"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Contact Info */}
              <div className="md:pl-4">
                <h3 className="text-xl font-light text-amber-400 mb-2">
                  Looking to Connect?
                </h3>
                <h4 className="text-3xl font-light text-white mb-6 tracking-wide">
                  CONTACT US
                </h4>

                {/* Info Cards */}
                <div className="space-y-4">
                  <div className="bg-gray-700 bg-opacity-40 rounded-lg p-4 border border-gray-600 shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <p className="text-gray-400 text-sm">
                          ososeijeweretefl2@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 bg-opacity-40 rounded-lg p-4 border border-gray-600 shadow">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-900"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Response Time</p>
                        <p className="text-gray-400 text-sm">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
