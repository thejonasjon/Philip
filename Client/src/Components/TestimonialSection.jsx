import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import Heading from "./ui/Heading";
import ImageTwo from "../assets/moment-2.png";
import SectionLayout from "../layouts/SectionLayout";

export default function TestimonialSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = Array.from({ length: 13 });

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

  // Detect which testimonial is currently visible
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children);

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft - container.scrollLeft
        );

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
  }, []);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex >= testimonials.length - 1
          ? 0
          : activeIndex + 1;

      scrollToTestimonial(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <SectionLayout>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10">
                  <Heading
                    heading="My students say;"
                    subHeading="Testimonials"
                  />

                  <Link to="/testimonials" className="hidden md:block max-w-2xl text-base font-normal text-[#0145A8] underline">
                    View all Reviews
                  </Link>
                </div>
      {/* Testimonials */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-10 overflow-x-auto scroll-smooth py-6 md:py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((_, index) => (
          <div
            key={index}
            className="w-[85%] shrink-0 md:w-125"
          >
            <TestimonialCard />
          </div>
        ))}
      </div>

      {/* Mobile-only view all link */}
      <Link
        to="/testimonials"
        className="block md:hidden text-center text-sm font-normal text-[#0145A8] underline"
      >
        View all Reviews
      </Link>

      {/* Indicators */}
      <div className="hidden md:flex justify-center gap-2">
        {testimonials.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <Button
              key={index}
              onClick={() => scrollToTestimonial(index)}
              className={`
                h-3 shrink-0 rounded-full p-0 transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "w-10 bg-[#0156D2]"
                    : "w-3 bg-[#C8C8C8]"
                }
              `}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
}

// Testimonial Card component
function TestimonialCard(){
    return (
        // bg-[linear-gradient(0deg,#FEFEFE,#FEFEFE),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(171,171,171,0.06)_100%)] shadow-[0px_0px_0px_0.97px_#EAEAEA80,0px_0.97px_2.92px_0px_#8F8F8F1A,inset_0px_-1.53px_0px_0px_#3D3D3D0A]
        <div className="min-h-70 md:min-h-116.75 w-full md:min-w-131.5 bg-[linear-gradient(180deg,#FFFFFF_0%,#ABABAB0F_100%)] flex flex-col justify-between rounded-2xl md:rounded-3xl px-6 md:px-9.5 py-8 md:py-16 shadow-[0_0_0_0.95px_#EAEAEA80,0_0.97px_2.92px_0_#8F8F8F1A,inset_0_-1.53px_0_0_#3D3D3D0A] cursor-pointer">
            <div className="text-base md:text-2xl text-[#22222299] font-normal">
                Thank you for your lessons. I would be very happy to stay in touch and discuss the possibility of scheduling private lessons with you.
            </div>

            <div className="flex gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-3 md:border-5 border-white">
                    <img src={ImageTwo} className="w-full h-full object-cover rounded-full rotate-90" />
                </div>
                <div>
                    <div className="text-lg md:text-2xl text-[#222222E5] font-semibold">Javier Molina Felix</div>
                    <div className="text-sm md:text-lg text-[#222222E5] font-light">Logistics Manager</div>
                </div>
            </div>
        </div>
    )
}