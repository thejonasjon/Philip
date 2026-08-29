import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import ImagePlaceHolder1 from "../assets/Avatar1.png";
import ImagePlaceHolder2 from "../assets/Avatar2.png";
import ImagePlaceHolder3 from "../assets/Avatar3.png";
import ImagePlaceHolder4 from "../assets/Avatar4.png";

export default function TestimonialHero() {
  const { t } = useTranslation();
  const profileRatings = [
    {
      imageName: ImagePlaceHolder1,
    },
    {
      imageName: ImagePlaceHolder2,
    },
    {
      imageName: ImagePlaceHolder3,
    },
    {
      imageName: ImagePlaceHolder4,
    },
  ];

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
      className="relative w-11/12 mx-auto min-h-70 md:min-h-112 overflow-hidden rounded-xl md:rounded-3xl flex justify-center items-center text-center text-white mt-20 md:mt-30"
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
          className="absolute -left-[15%] -top-[20%] h-130 w-130 rounded-full bg-[#1C1C7E]/40 blur-[100px]"
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
          className="absolute -right-[15%] top-[5%] h-120 w-120 rounded-full bg-[#DA5548]/30 blur-[100px]"
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
          className="absolute left-[25%] -bottom-[25%] h-112.5 w-112.5 rounded-full bg-[#8B8FA8]/30 blur-[110px]"
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
          className="absolute left-[40%] top-[15%] h-75 w-75 rounded-full bg-white/[0.07] blur-[80px]"
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
        <div className="absolute inset-0 bg-white/2.5 backdrop-blur-[1px]" />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================== */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-12 md:py-0">
        {/* H1 */}
        <div className="flex items-center">
          {profileRatings.map((profile, i) => (
            <div
              key={i}
              className="-ml-2 h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-white shadow-md first:ml-0"
            >
              <img
                src={profile.imageName}
                alt={`Satisfied-student-${i}`}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          ))}
        </div>

        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="max-w-4xl text-[36px] md:text-[56px] font-medium leading-[1.1] text-[#F7F4EF mt-2"
        >
          {t("testimonialPage.hero.heading")}
        </motion.h1>

        {/* Reviews */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={1.25}
          className="mt-2 flex items-center justify-center gap-4"
        >
          <div className="text-left text-[#F7F4EF]">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="relative w-4 h-4">
                    {/* Empty/white star */}
                    <Star
                      size={16}
                      fill="white"
                      color="white"
                      className="absolute inset-0"
                    />

                    {/* Filled portion */}
                    {index < 4 && (
                      <Star
                        size={16}
                        fill="#FDB022"
                        color="#FDB022"
                        className="absolute inset-0"
                      />
                    )}

                    {/* 50% filled last star */}
                    {index === 4 && (
                      <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star size={16} fill="#FDB022" color="#FDB022" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <span className="text-[11px] font-medium">4.5/5</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
