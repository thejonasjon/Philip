import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import About2 from "../assets/about-2.png";
import About1 from "../assets/about-1.png";
import flag1 from "../assets/flag-1.png";
import flag2 from "../assets/flag-2.png";
import flag3 from "../assets/flag-3.png";
import flag4 from "../assets/flag-4.png";
import flag5 from "../assets/flag-5.png";
import flag6 from "../assets/flag-6.png";
import flag7 from "../assets/flag-7.png";
import flag8 from "../assets/flag-8.png";
import flag9 from "../assets/flag-9.png";
import flag10 from "../assets/flag-10.png";
import flag11 from "../assets/flag-11.png";
import flag13 from "../assets/flag-13.png";
import flag14 from "../assets/flag-14.png";
import flag15 from "../assets/flag-15.png";
import flag16 from "../assets/flag-16.png";
import flag17 from "../assets/flag-17.png";
import SectionLayout from "../layouts/SectionLayout";
import { motion } from "framer-motion";

export default function AboutMeSection() {
  const flags = [
    flag1,
    flag2,
    flag3,
    flag4,
    flag5,
    flag6,
    flag7,
    flag8,
    flag9,
    flag10,
    flag11,
    flag13,
    flag14,
    flag15,
    flag16,
    flag17,
  ];
  const { t } = useTranslation();

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = 3;

  const scrollToSlide = (index) => {
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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children);
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
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const leftCardVariants = {
    hidden: {
      opacity: 0,
      x: -45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <SectionLayout id="aboutMe">
      {/* Mobile - Flags bar */}
      <div className="min-w-0 rounded-xl md:rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-5 md:hidden">
        <div className="flex min-w-0 items-center gap-4">
          <div className="shrink-0 whitespace-nowrap text-base font-normal leading-6 text-[#22222299]">
            {t("aboutMe.lectured")}
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: flags.length * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...flags, ...flags].map((flag, index) => (
                <div
                  key={index}
                  className="w-8 shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    src={flag}
                    alt={`Flag ${(index % flags.length) + 1}`}
                    className="block h-full w-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile - Swipeable cards */}
      <div className="mt-3 md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Slide 1 - Certified */}
          <motion.div
            className="w-[88%] shrink-0 snap-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex min-h-100 flex-col overflow-hidden rounded-xl md:rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8]">
              <div className="w-full h-64">
                <img
                  src={About1}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 text-xl font-normal leading-8 text-[#222222]">
                {t("aboutMe.certified.by")}{" "}
                <span className="font-semibold">{t("aboutMe.certified.cert")}</span>{" "}
                {t("aboutMe.certified.vouched")}<span className="font-semibold">{t("aboutMe.certified.student")}</span>
              </div>
            </div>
          </motion.div>

          {/* Slide 2 - Students taught */}
          <motion.div
            className="w-[88%] shrink-0 snap-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative overflow-hidden flex flex-col justify-between min-h-100 rounded-xl md:rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-6">
              <div className="absolute w-full h-full inset-0 z-0">
                <img
                  src={About2}
                  className="w-full h-full object-cover opacity-30"
                />
              </div>

              <div className="relative z-10">
                <div className="text-4xl font-bold text-[#222222]">{t("aboutMe.taught.stats")}</div>
                <span className="text-base font-light leading-7 text-[#22222299]">
                  {t("aboutMe.taught.students")}
                </span>
              </div>

              <div className="relative z-10 text-base font-light leading-7 text-[#22222299]">
                {t("aboutMe.taught.paragraph")}
              </div>
            </div>
          </motion.div>

          {/* Slide 3 - Experience + Beginners */}
          <motion.div
            className="w-[88%] shrink-0 snap-center flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative overflow-hidden min-h-30 flex flex-col justify-center text-2xl font-semibold leading-tight text-[#222222] rounded-xl md:rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-6">
              {t("aboutMe.years.year")}
              <span className="block text-base font-light text-[#222222B2]">
                {t("aboutMe.years.paragraph")}
              </span>
              <div className="absolute -left-40 top-5 w-full h-full bg-[#2B59FF]/20 blur-3xl z-10" />
              <div className="absolute bottom-8 -right-40 w-full h-full bg-[#F98272]/20 blur-3xl z-10" />
            </div>

            <div className="relative flex flex-col justify-end w-full min-h-60 rounded-xl md:rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-6">
              <div className="absolute w-full h-full inset-0 z-0">
                <img src={About2} className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 max-w-60 text-2xl font-medium text-[#22222299]">
                {t("aboutMe.fluent")}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: slideCount }).map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 shrink-0 rounded-full p-0 transition-all duration-300 ease-in-out ${
                  isActive ? "w-6 bg-[#0156D2]" : "w-1.5 bg-[#C8C8C8]"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop - Original grid layout */}
      {/* Desktop - Animated grid */}
      <motion.div
        className="hidden md:grid w-full grid-cols-1 gap-3 md:grid-cols-[1fr_2fr] md:grid-rows-[5fr_1fr]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left - Full Height */}
        <motion.div
          variants={leftCardVariants}
          whileHover={{
            y: -5,
            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
          className="row-span-3 relative flex min-h-195 flex-col justify-end rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-10 overflow-hidden"
        >
          <div className="absolute w-full h-full inset-0 z-0">
            <img src={About1} className="mx-auto object-cover" />
          </div>

          <div className="max-w-80 relative z-10 text-[32px] font-normal leading-11.5 text-[#787878]">
            {t("aboutMe.certified.by")}{" "}
            <span className="font-semibold text-[#222222]">
              {t("aboutMe.certified.cert")}
            </span>{" "}
            {t("aboutMe.certified.vouched")}{" "}
            <span className="font-semibold text-[#222222]">{t("aboutMe.certified.student")}</span>
          </div>
        </motion.div>

        {/* Right - Top Row */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {/* Students */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            className="relative overflow-hidden flex flex-col justify-between rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-10"
          >
            <div className="absolute w-full h-full inset-0 z-0">
              <img
                src={About2}
                className="w-full h-full object-cover opacity-30"
              />
            </div>

            <div className="relative z-10">
              <div className="text-6xl font-bold text-[#222222]">{t("aboutMe.taught.stats")}</div>

              <span className="text-[22px] font-light leading-9.5 text-[#22222299]">
                {t("aboutMe.taught.students")}
              </span>
            </div>

            <div className="relative z-10 text-[22px] font-light leading-9.5 text-[#22222299]">
              {t("aboutMe.taught.paragraph")}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col w-full justify-between gap-3"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              className="relative overflow-hidden min-h-49 flex flex-col justify-center text-[38px] font-semibold leading-tight text-[#222222] rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-10"
            >
                {t("aboutMe.years.year")}
              <span className="block text-2xl font-light text-[#222222B2]">
                {t("aboutMe.years.paragraph")}
              </span>
              <motion.div
                animate={{
                  x: [-10, 10, -10],
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-80 top-5 w-full h-full bg-[#2B59FF]/20 blur-3xl z-10"
              />
              <motion.div
                animate={{
                  x: [10, -10, 10],
                  y: [5, -5, 5],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-12 -right-75 w-full h-full bg-[#F98272]/20 blur-3xl z-10"
              />
            </motion.div>

            {/* Beginners */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              className="relative flex flex-col justify-end w-full h-full rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-10 overflow-hidden"
            >
              <div className="absolute w-full h-full inset-0 z-0">
                <img src={About2} className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10 max-w-60 text-[40px] font-medium text-[#22222299]">
                {t("aboutMe.fluent")}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Countries */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -3,
            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
          className="min-w-0 rounded-3xl border-[0.5px] border-[#00000033] bg-[#f8f8f8] p-10"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="shrink-0 whitespace-nowrap text-2xl font-normal leading-7.5 text-[#22222299]">
              {t("aboutMe.lectured")}
            </div>

            <div className="min-w-0 relative flex-1 overflow-hidden">
              <motion.div
                className="flex w-max items-center gap-3"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: flags.length * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...flags, ...flags].map((flag, index) => (
                  <div
                    key={index}
                    className="w-12 shrink-0 overflow-hidden rounded-md"
                  >
                    <img
                      src={flag}
                      alt={`Flag ${(index % flags.length) + 1}`}
                      className="block w-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionLayout>
  );
}
