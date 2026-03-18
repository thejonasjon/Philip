import React from "react";
import myImage from "./assets/hero-pic.png";

const About = () => {
  return (
    <section id="about" className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* --- Image Column --- */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-orange-300 rounded-3xl blur-2xl opacity-25"></div>
              <img
                src={myImage}
                alt="Osose Philips Ijewere"
                className="relative w-full h-full object-cover rounded-3xl border-4 border-orange-400 shadow-xl"
              />
            </div>
          </div>

          {/* --- Text Column --- */}
          <div className="lg:w-2/3 bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center lg:text-left">
              About Me
            </h2>

            <div className="text-gray-300 text-base leading-relaxed space-y-5">
              <p className="text-orange-400 font-semibold text-lg">
                Hey, I'm Philips Osose Ijewere!
              </p>

              <p>
                I am an experienced online ESL tutor with TEFL and TEO
                qualifications. With over 7 years of teaching experience, I’ve
                had the privilege of helping thousands of students from around
                the world (including Austria, Brazil, Chile, China, Colombia,
                Egypt, France, Germany, Iran, Israel, Italy, Japan, Korea,
                Mexico, Morocco, Pakistan, Poland, Romania, Russia, Slovakia,
                Spain, Switzerland, Thailand, Venezuela and other countries)
                achieve their English goals.
              </p>

              <p>
                I believe that personalized lessons, where students can learn at
                their own pace while building confidence and fluency in a fun,
                pressure-free environment, is the best way to learn.
              </p>

              <p className="text-orange-300 font-medium">
                Do you agree? Are you ready to start? Reach out today — let's
                connect and make learning English enjoyable!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
