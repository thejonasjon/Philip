import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchTestimonies } from "./services/api";

const fallbackTestimonials = [
  // {
  //   id: "1",
  //   full_name: "Linh N.",
  //   email: "linh@example.com",
  //   profession: "Student",
  //   country: "Vietnam",
  //   message: "I was very nervous speaking English, but my tutor made me feel so comfortable. She's patient, kind, and always helps me correct my mistakes in a gentle way. My confidence has improved a lot.",
  //   status: { name: "approved" },
  // },
  // {
  //   id: "2",
  //   full_name: "Carlos M.",
  //   email: "carlos@example.com",
  //   profession: "Marketing Analyst",
  //   country: "Spain",
  //   message: "I needed help preparing for job interviews and writing emails in English. My tutor helped me sound professional and clear. Now I feel ready for any meeting or presentation!",
  //   status: { name: "approved" },
  // },
  // {
  //   id: "3",
  //   full_name: "Aya T.",
  //   email: "aya@example.com",
  //   profession: "Student",
  //   country: "Japan",
  //   message: "Each lesson is interesting and full of energy. She uses games, real-life examples, and current events to help me improve. I actually look forward to our classes!",
  //   status: { name: "approved" },
  // },
  // {
  //   id: "4",
  //   full_name: "Mohammed A.",
  //   email: "mohammed@example.com",
  //   profession: "Medical Intern",
  //   country: "Saudi Arabia",
  //   message: "Before I started, I could understand English but struggled to speak. Now, I can hold conversations, express opinions, and even tell jokes in English!",
  //   status: { name: "approved" },
  // },
  // {
  //   id: "5",
  //   full_name: "Sofia G.",
  //   email: "sofia@example.com",
  //   profession: "Product Designer",
  //   country: "Brazil",
  //   message: "Every lesson is tailored to my level and goals. My tutor knows exactly how to push me without overwhelming me. It's the best learning experience I've had online.",
  //   status: { name: "approved" },
  // },
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const splideRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await FetchTestimonies();
        console.log("Fetched Testimonials:", data);
        setTestimonials(data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error.message);
        setTestimonials([]);
      }
    }

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (splideRef.current && testimonials.length > 0) {
      splideRef.current.splide.refresh();
    }
  }, [testimonials]);

  // Use API testimonials if available, else fallback
  const allTestimonials = testimonials;

  const handleMove = (splide, newIndex) => setActiveIndex(newIndex);

  return (
    <section
      id="testimonials"
      className="bg-stone-400 py-12 sm:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
            Testimonial Reviews
          </h2>
          <p className="text-white text-sm sm:text-base max-w-3xl mx-auto">
            What our students say about learning English with us.
          </p>
        </div>

        {/* --- Testimonial Slider --- */}
        {allTestimonials.length > 0 && (
          <Splide
            key={testimonials.length}
            ref={splideRef}
            aria-label="Testimonial Slider"
            options={{
              type: "loop",
              perPage: 3,
              autoplay: true,
              interval: 3000,
              pauseOnHover: true,
              gap: "1.5rem",
              speed: 800,
              easing: "linear",
              pagination: false,
              arrows: false,
              drag: false,
              breakpoints: { 1024: { perPage: 1 } },
            }}
            onMoved={handleMove}
          >
            {allTestimonials.map((t) => (
              <SplideSlide key={t.id}>
                <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col justify-between hover:scale-[1.02] transition duration-300">
                  <div>
                    <div className="text-orange-600 text-4xl mb-4">"</div>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                      {t.message}
                    </p>
                  </div>

                  <div className="flex items-center mt-auto">
                    <img
                      src={
                        t.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          t.full_name,
                        )}&background=f97316&color=fff&size=128`
                      }
                      alt={t.full_name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-300"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-base">
                        {t.full_name}
                      </h4>
                      <p className="text-gray-500 text-sm">{t.profession}</p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        )}

        {/* --- Pagination Dots --- */}
        <div className="flex justify-center mt-8 space-x-2">
          {allTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => splideRef.current?.go(i)}
              className={`w-3 h-3 rounded-full ${
                i === activeIndex ? "bg-orange-600 scale-110" : "bg-orange-300"
              }`}
            />
          ))}
        </div>

        {/* --- View All Reviews Button --- */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/testimonials")}
            className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-full cursor-pointer hover:bg-orange-700 transition duration-300"
          >
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
