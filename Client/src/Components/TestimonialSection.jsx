import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import Heading from "./ui/Heading";
import SectionLayout from "../layouts/SectionLayout";
import { FetchTestimonies } from "../services/api";
import { BOOKING_URL } from "../constants/links";

export default function TestimonialSection() {
  const scrollRef = useRef(null);

  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleScheduleClick = () => {
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  // Fetch testimonials
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

  // Scroll to a specific testimonial
  const scrollToTestimonial = (index) => {
    const container = scrollRef.current;

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  // Detect currently visible testimonial
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children);

      if (!cards.length) return;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - container.scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [testimonials]);

  // Auto scroll
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex =
        activeIndex >= testimonials.length - 1 ? 0 : activeIndex + 1;

      scrollToTestimonial(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, testimonials.length]);

  return (
    <SectionLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10">
        <Heading heading="My students say;" subHeading="Testimonials" />

        <Link
          to="/testimonials"
          className="hidden md:block max-w-2xl text-base font-normal text-[#0145A8] underline"
        >
          View all Reviews
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center text-[#22222299]">
          Loading testimonials...
        </div>
      )}

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-10 overflow-x-auto scroll-smooth py-6 md:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-[85%] shrink-0 md:w-125">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && testimonials.length === 0 && (
        <div className="py-20 text-center text-[#22222299]">
          No testimonials available yet.
        </div>
      )}

      {/* Mobile View All */}
      {!loading && testimonials.length > 0 && (
        <Link
          to="/testimonials"
          className="block md:hidden text-center text-sm font-normal text-[#0145A8] underline"
        >
          View all Reviews
        </Link>
      )}

      {/* Indicators */}
      {!loading && testimonials.length > 0 && (
        <div className="hidden md:flex justify-center gap-2 mt-4">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;

            return (
              <Button
                key={testimonial.id}
                onClick={() => scrollToTestimonial(index)}
                className={`
                  h-3 shrink-0 rounded-full p-0
                  transition-all duration-300 ease-in-out
                  ${isActive ? "w-10 bg-[#0156D2]" : "w-3 bg-[#C8C8C8]"}
                `}
              />
            );
          })}
        </div>
      )}

      <div className="w-full flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mt-20">
        <Link
          to="/testimonials"
          className="sm:w-auto min-w-55 h-12 px-8 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0245a8] border-[0.5px] border-[#0245a8] font-medium rounded-lg transform transition-all duration-300 ease-in-out hover:scale-101 cursor-pointer"
        >
          View More Reviews
        </Link>

        <Button
          onClick={handleScheduleClick}
          className="sm:w-auto min-w-55 h-12 px-8 bg-[#0245a8] hover:bg-[#0156d2]"
          variant="primary"
          size="lg"
        >
          Schedule a Trial Lesson
        </Button>
      </div>
    </SectionLayout>
  );
}

// ===============================
// Testimonial Card
// ===============================

function TestimonialCard({ testimonial }) {
  const truncateText = (text, maxLength = 220) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    return `${text.slice(0, maxLength).trim()}...`;
  };

  return (
    <div
      className="
        min-h-70 md:min-h-116.75
        w-full md:min-w-131.5
        bg-[linear-gradient(180deg,#FFFFFF_0%,#ABABAB0F_100%)]
        flex flex-col justify-between
        rounded-2xl md:rounded-3xl
        px-6 md:px-9.5
        py-8 md:py-16
        shadow-[0_0_0_0.95px_#EAEAEA80,0_0.97px_2.92px_0_#8F8F8F1A,inset_0_-1.53px_0_0_#3D3D3D0A]
        cursor-pointer
      "
    >
      {/* Message */}
      <div className="text-base md:text-2xl text-[#22222299] font-normal">
        {truncateText(testimonial.message, 220)}
      </div>

      {/* Student */}
      <div className="flex gap-3 md:gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-3 md:border-5 border-white overflow-hidden">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.full_name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#0245a8] flex items-center justify-center">
              <span className="text-base md:text-xl font-semibold text-white">
                {testimonial.full_name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Name / Profession */}
        <div>
          <div className="text-lg md:text-2xl text-[#222222E5] font-semibold">
            {testimonial.full_name}
          </div>

          <div className="text-sm md:text-lg text-[#222222E5] font-light">
            {testimonial.profession}
          </div>
        </div>
      </div>
    </div>
  );
}
