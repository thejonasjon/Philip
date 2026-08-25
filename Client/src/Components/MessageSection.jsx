import MessageImage from "../assets/message.png";
import Heading from "./ui/Heading";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MailOpenIcon,
  PhoneCallIcon,
} from "@hugeicons/core-free-icons";
import SectionLayout from "../layouts/SectionLayout";
import Button from "./ui/Button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MessageSection() {
  return (
    <SectionLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10">
          <div className="w-full md:max-w-120">
            <Heading
              heading="Call. Message. Email; I’m Here."
              subHeading=""
            />
          </div>

          <p className="w-full md:max-w-140 text-base md:text-xl font-light text-[#22222299]">
            Tell me about yourself. I will respond to every message, call &
            email personally within 24 hours.
          </p>
        </div>

        <div className="w-fit flex flex-col justify-start items-start gap-3">
          <div className="flex justify-center items-center gap-2 text-sm md:text-[18px] text-[#22222299] font-light leading-8">
            <HugeiconsIcon icon={MailOpenIcon} />
            admin@tutorphilips.com
          </div>

          <div className="flex justify-center items-center gap-2 text-sm md:text-[18px] text-[#22222299] font-light leading-8">
            <HugeiconsIcon icon={PhoneCallIcon} />
            +44 7473344313
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MessageForm />

          <div className="relative hidden md:block overflow-hidden bg-[#F7F4EF] rounded-3xl border-[0.2px] border-[#00000033] h-80 md:h-auto">
            <div className="absolute -left-16 top-6 md:-left-45 md:top-16">
              <img
                src={MessageImage}
                className="w-full h-full object-cover -scale-x-100"
              />

              <div className="absolute inset-0 bg-[#978e8e] opacity-100 mix-blend-color" />
            </div>

            <div className="absolute -left-10 top-20 md:-left-50 md:top-86 w-full h-full rounded-full bg-[#2B59FF]/20 blur-[60px] md:blur-[80px] z-10" />

            <div className="absolute -right-10 bottom-10 md:-right-60 md:bottom-50 w-full h-full rounded-full bg-[#F98272]/80 blur-[100px] md:blur-[280px] z-10" />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "Please enter your name.";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Please enter your email.";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        error = "Please enter a valid email address.";
      }
    }

    if (name === "message") {
      if (!value.trim()) {
        error = "Please enter your message.";
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate as the user types after an error exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);

      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://formspree.io/f/myznqzrv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success(
        "Message sent successfully! We'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error sending message:", error);

      toast.error(
        "Failed to send message. Please try again or email us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-8">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Your name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={`text-sm text-[#22222289] leading-8 rounded-lg bg-[#f6f8fb] border py-3 px-2.5 outline-none transition-colors ${
              errors.name
                ? "border-red-400 focus:border-red-500"
                : "border-[#0145A814] focus:border-[#0245a8]"
            }`}
          />

          {errors.name && (
            <p className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className={`text-sm text-[#22222289] leading-8 rounded-lg bg-[#f6f8fb] border py-3 px-2.5 outline-none transition-colors ${
              errors.email
                ? "border-red-400 focus:border-red-500"
                : "border-[#0145A814] focus:border-[#0245a8]"
            }`}
          />

          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Your Message
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Briefly tell us about your message"
            className={`text-sm text-[#22222289] h-50 leading-8 rounded-lg bg-[#f6f8fb] border py-3 px-2.5 outline-none resize-none transition-colors ${
              errors.message
                ? "border-red-400 focus:border-red-500"
                : "border-[#0145A814] focus:border-[#0245a8]"
            }`}
          />

          {errors.message && (
            <p className="text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#0245a8] text-base text-[#F7F4EF] font-medium leading-6.5 py-4 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>

      </div>
    </form>
  );
}