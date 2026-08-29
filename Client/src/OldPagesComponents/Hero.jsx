import React from "react";
import myPic from "./assets/philip-new.jpg";
import { HoverBorderGradient } from "../Components/ui/hover-border-gradient";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="bg-slate-900 min-h-screen flex items-center py-12 pt-24 lg:pt-12"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-orange-300 rounded-full blur-2xl opacity-30"></div>
            <img
              src={myPic}
              alt="Tutor Philips"
              className="relative w-full h-full object-cover object-top rounded-full border-4 border-orange-400 shadow-lg"
            />
          </div>
        </div>

        <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            Hi, I'm <span className="text-orange-400">Philips</span>, a
            certified online English Instructor.
          </h1>

          <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
            Dedicated to helping you improve your fluency, pronunciation, and
            confidence through engaging and personalized lessons.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <HoverBorderGradient onClick={scrollToContact} duration={1.5}>
              Start your English Journey with Me
            </HoverBorderGradient>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
