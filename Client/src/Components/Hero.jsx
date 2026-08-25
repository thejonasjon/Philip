import { motion } from "framer-motion";
import Button from "./ui/Button";
import ImagePlaceHolder from "../assets/philip-new.jpg";
import { Star } from "lucide-react";
import { Certificate01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import heroPattern from "../assets/overlay.png"
import headShot from "../assets/headshot.jpg"

export default function Hero() {
  const profiles = [1, 2, 3, 4];

  const reveal = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div
      className="relative w-11/12 mx-auto h-auto md:h-[83.333vh] overflow-hidden rounded-xl md:rounded-3xl text-center text-white mt-20 md:mt-30"
      style={{
        background:
          "linear-gradient(78.97deg, rgba(28,28,126,0.8) 9.02%, rgba(139,143,168,0.8) 43.05%, rgba(218,85,72,0.4) 63.19%, rgba(218,85,72,0.64) 102.35%)",
      }}
    >
      {/* =========================================================
          LIQUID GLASS BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue liquid */}
        <motion.div
          className="absolute -left-[15%] -top-[20%] h-[520px] w-[520px] rounded-full bg-[#1C1C7E]/40 blur-[100px]"
          animate={{
            x: [0, 120, 280, 160, 0],
            y: [0, 100, 240, 330, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
            borderRadius: [
              "42% 58% 63% 37% / 45% 38% 62% 55%",
              "60% 40% 38% 62% / 55% 45% 55% 45%",
              "35% 65% 55% 45% / 60% 35% 65% 40%",
              "55% 45% 65% 35% / 40% 60% 40% 60%",
              "42% 58% 63% 37% / 45% 38% 62% 55%",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Red liquid */}
        <motion.div
          className="absolute -right-[15%] top-[5%] h-[480px] w-[480px] rounded-full bg-[#DA5548]/30 blur-[100px]"
          animate={{
            x: [0, -120, -260, -140, 0],
            y: [0, 120, 250, 340, 0],
            scale: [1, 1.1, 0.85, 1.15, 1],
            borderRadius: [
              "58% 42% 35% 65% / 52% 63% 37% 48%",
              "40% 60% 60% 40% / 45% 35% 65% 55%",
              "65% 35% 45% 55% / 55% 60% 40% 45%",
              "35% 65% 55% 45% / 60% 40% 60% 40%",
              "58% 42% 35% 65% / 52% 63% 37% 48%",
            ],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grey / purple liquid */}
        <motion.div
          className="absolute left-[25%] -bottom-[25%] h-[450px] w-[450px] rounded-full bg-[#8B8FA8]/30 blur-[110px]"
          animate={{
            x: [0, -100, 180, 280, 0],
            y: [0, -180, -280, -100, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            borderRadius: [
              "63% 37% 48% 52% / 40% 58% 42% 60%",
              "40% 60% 55% 45% / 60% 40% 60% 40%",
              "55% 45% 35% 65% / 45% 65% 35% 55%",
              "35% 65% 65% 35% / 55% 45% 55% 45%",
              "63% 37% 48% 52% / 40% 58% 42% 60%",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Soft glass highlight */}
        <motion.div
          className="absolute left-[40%] top-[15%] h-[300px] w-[300px] rounded-full bg-white/[0.07] blur-[80px]"
          animate={{
            x: [-50, 100, -80, 120, -50],
            y: [-30, 100, 180, 60, -30],
            scale: [0.8, 1.2, 0.9, 1.15, 0.8],
            opacity: [0.3, 0.6, 0.35, 0.7, 0.3],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Very subtle glass layer */}
        <div className="absolute inset-0 bg-white/[0.025] backdrop-blur-[1px]" />
      </div>

      <div className="w-full h-full absolute inset-0">
        <img src={heroPattern} className="w-full h-full object-cover opacity-25"/>
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-16 md:py-0">
        {/* H1 */}
       <motion.h1
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="max-w-xs md:max-w-4xl text-[32px] md:text-[56px] font-medium leading-[1.15] md:leading-[1.1] text-[#F7F4EF]"
        >
          The English {" "}
            <span className="relative inline-block h-13 w-22 md:h-23.5 md:w-40 align-middle">
            {/* Background shape */}
            <span className="absolute inset-0 h-13 w-22 md:h-23.5 md:w-40 rounded-lg md:rounded-xl bg-[#F98272] opacity-50 rotate-8" />

            {/* Image */}
            <span className="absolute inset-0 h-13 w-22 md:h-23.5 md:w-40 overflow-hidden rounded-lg md:rounded-xl -rotate-12">
              <img
                src={headShot}
                alt="English tutor"
                className="h-full w-full scale-[2.2] object-cover object-[50%_-13%]"
              />
            </span>
          </span>
          {" "}Tutor that Builds Your Confidence!
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mt-3 max-w-xs md:max-w-2xl text-base md:text-[22px] leading-relaxed text-[#F7F4EFB2]"
        >
          Helping you improve fluency, pronunciation, and confidence through
          engaging, personalized lessons.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={0.95}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Button
            className="shadow-2xl hover:bg-[#034ab3]"
            variant="primary"
            size="lg"
          >
            Schedule a Trial Lesson
          </Button>

          <Button
            className="hidden md:inline-flex group bg-white px-4 shadow-2xl hover:bg-[#f0f0f0]"
            variant="outline"
            size="lg"
          >
            <HugeiconsIcon icon={Certificate01Icon} className="text-2xl text-[#0156D2] transition-transform duration-300 ease-in-out group-hover:scale-110" />

          </Button>
        </motion.div>

        {/* Reviews */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={1.25}
          className="hidden md:flex mt-8 items-center justify-center gap-4"
        >
          <div className="flex items-center">
            {profiles.map((profile) => (
              <div
                key={profile}
                className="-ml-2 h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white shadow-md first:ml-0"
              >
                <img
                  src={ImagePlaceHolder}
                  alt="Satisfied student"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-left text-[#F7F4EF]">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="#FDB022"
                    color="#FDB022"
                  />
                ))}
              </div>

              <span className="text-[11px] font-medium">4.5/5</span>
            </div>

            <p className="mt-1 text-[10px]">
              Over 500+ Satisfied Students
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}