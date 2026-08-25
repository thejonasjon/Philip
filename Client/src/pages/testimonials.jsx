import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import Heading from "../Components/ui/Heading";
import Button from "../Components/ui/Button";
import SectionLayout from "../layouts/SectionLayout";
import TestimonialHero from "../Components/TestimonialHero";
import { FetchTestimonies } from "../services/api";
import ReviewModal from "../Components/ReviewModal";
import ThankYou from "../Components/ThankYou";

export default function NewTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await FetchTestimonies();

        console.log("Fetched testimonials:", data);

        setTestimonials(data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error.message);

        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  return (
    <div className="mt-12">
      <Navbar />

      <TestimonialHero />

      {/* <ReviewModal /> */}
      {/* <ThankYou /> */}

      <SectionLayout>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10">
          <Heading heading="My students say;" subHeading="Testimonials" />

          <Button
          onClick={() => setShowReviewModal(true)}
          className="w-full md:w-auto rounded-lg bg-[#0245a8] px-8 py-3 text-base font-normal text-[#F7F4EF]">
            Send a Review
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-[#22222299]">
            Loading testimonials...
          </div>
        )}

        {/* Testimonials */}
        {!loading && testimonials.length > 0 && (
          <div className="mx-auto my-10 md:my-20 w-full md:w-10/12 cursor-pointer">
            <div className="flex flex-col">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="sticky top-24 md:top-32"
                  style={{
                    zIndex: index,
                    // marginBottom: "40px",
                  }}
                >
                  <div className="min-h-auto md:min-h-80 w-full rounded-2xl md:rounded-3xl bg-[#FFFFFF] bg-[linear-gradient(180deg,#FFFFFF_0%,#ABABAB0F_100%)] px-6 md:px-9.5 py-8 md:py-16 shadow-[0_0_0_0.95px_#EAEAEA80,0_0.97px_2.92px_0_#8F8F8F1A,inset_0_-1.53px_0_0_#3D3D3D0A] transition-all duration-700 ease-out">
                    {/* Message */}
                    <div className="text-base md:text-2xl font-normal text-[#22222299]">
                      {testimonial.message}
                    </div>

                    {/* Student */}
                    <div className="mt-6 md:mt-10 flex gap-3 md:gap-4">
                      <div className="h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded-full border-3 md:border-5 border-white">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.full_name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0245a8]">
                            <span className="text-base md:text-xl font-semibold text-white">
                              {testimonial.full_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="text-lg md:text-2xl font-semibold text-[#222222E5]">
                          {testimonial.full_name}
                        </div>

                        <div className="text-sm md:text-lg font-light text-[#222222E5]">
                          {testimonial.profession}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && testimonials.length === 0 && (
          <div className="py-20 text-center text-[#22222299]">
            No testimonials available yet.
          </div>
        )}

        {showReviewModal && (
  <ReviewModal
    onClose={() => setShowReviewModal(false)}
    onSuccess={() => {
      setShowReviewModal(false);
      setShowThankYou(true);
    }}
  />
)}

{showThankYou && (
  <ThankYou
    onClose={() => setShowThankYou(false)}
  />
)}

      </SectionLayout>
    </div>
  );
}