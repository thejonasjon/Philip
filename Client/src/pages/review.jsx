import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Components/ui/Button";
import SectionLayout from "../layouts/SectionLayout";
import ThankYou from "../Components/ThankYou";
import CountrySelect from "../Components/ui/CountrySelect";
import { CreateTestimonial } from "../services/api";
import { toast } from "react-toastify";

export default function Review() {
  const { t } = useTranslation();
  const [showThankYou, setShowThankYou] = useState(false);

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
      newErrors.name = t("testimonialPage.reviewModal.form.0.validationError");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("testimonialPage.reviewModal.form.1.validationError");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t(
        "testimonialPage.reviewModal.form.1.validationError2",
      );
    }

    if (!formData.profession.trim()) {
      newErrors.profession = t(
        "testimonialPage.reviewModal.form.2.validationError",
      );
    }

    if (!formData.country.trim()) {
      newErrors.country = t(
        "testimonialPage.reviewModal.form.3.validationError",
      );
    }

    if (!formData.text.trim()) {
      newErrors.text = t("testimonialPage.reviewModal.form.4.validationError");
    } else if (formData.text.trim().length < 10) {
      newErrors.text = t("testimonialPage.reviewModal.form.4.validationError2");
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
      setShowThankYou(true);

      toast.success(t("testimonialPage.reviewModal.successful"));

      setFormData({
        name: "",
        email: "",
        profession: "",
        country: "",
        text: "",
      });

      setErrors({});

    } catch (error) {
      console.error(t("testimonialPage.reviewModal.error"), error);

      toast.error(
        error?.response?.data?.message ||
          t("testimonialPage.reviewModal.error"),
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
          {t("testimonialPage.reviewModal.form.0.label")}
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("testimonialPage.reviewModal.form.0.placeholder")}
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
          {t("testimonialPage.reviewModal.form.1.label")}
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("testimonialPage.reviewModal.form.1.placeholder")}
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
          {t("testimonialPage.reviewModal.form.2.label")}
        </label>

        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          placeholder={t("testimonialPage.reviewModal.form.2.placeholder")}
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
          {t("testimonialPage.reviewModal.form.3.label")}
        </label>

        <CountrySelect
          name="country"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
          placeholder={t("testimonialPage.reviewModal.form.3.placeholder")}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1 md:gap-2">
        <label className="text-[12px] font-semibold uppercase text-[#0156D2]">
          {t("testimonialPage.reviewModal.form.4.label")}
        </label>

        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder={t("testimonialPage.reviewModal.form.4.placeholder")}
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
        {loading
          ? t("testimonialPage.buttonText.loading")
          : t("testimonialPage.buttonText.sendReview")}
      </Button>
    </>
  );

  return (
    <div className="mt-12">
      {/* <TestimonialHero /> */}

      <SectionLayout>
        {/* Header */}
        <div className="w-11/12 md:w-9/12 mx-auto text-center flex flex-col items-center justify-center gap-4 mt-12 mb-20">
            <h2 className="font-euclid text-3xl md:text-5xl text-[#222222]">
                {t("reviewPage.heading")}
            </h2>

            <p className="max-w-2xl font-euclid text-base text-[#605f5f]">
                {t("reviewPage.paragraph")}
            </p>
        </div>

        <div className="flex items-center justify-center"        >
          <div
            className="w-11/12 md:w-9/12 bg-white rounded-xl border border-gray-200 md:rounded-xl p-0 md:p-6"
          >
            <div className="px-2 py-2 md:px-6">
                <h4 className="text-4xl font-medium text-[#222222] mb-6">
                    {t("reviewPage.formHeading")}
                </h4>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center"
              >
                <div className="flex flex-col gap-3 md:gap-4">{fields}</div>
              </form>
            </div>
          </div>
        </div>
        {showThankYou && <ThankYou onClose={() => setShowThankYou(false)} />}
      </SectionLayout>
    </div>
  );
}