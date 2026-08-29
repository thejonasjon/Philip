import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Heading from "./ui/Heading";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BriefcaseBusinessFreeIcons,
  ContentWritingFreeIcons,
  ConversationFreeIcons,
  GraduationCapFreeIcons,
  SpeechFreeIcons,
} from "@hugeicons/core-free-icons";
import SectionLayout from "../layouts/SectionLayout";
import { BOOKING_URL } from "../constants/links";
import Button from "./ui/Button";

export default function TutorialSection() {
  const { t } = useTranslation();

  const tutorialData = [
    {
      icon: <HugeiconsIcon icon={ConversationFreeIcons} size={32} />,
      heading: t("tutorial.cards.0.heading"),
      paragraph: t("tutorial.cards.0.paragraph")
    },
    {
      icon: <HugeiconsIcon icon={BriefcaseBusinessFreeIcons} size={32} />,
       heading: t("tutorial.cards.1.heading"),
      paragraph: t("tutorial.cards.1.paragraph")
    },
    {
      icon: <HugeiconsIcon icon={ContentWritingFreeIcons} size={32} />,
       heading: t("tutorial.cards.2.heading"),
      paragraph: t("tutorial.cards.2.paragraph")
    },
    {
      icon: <HugeiconsIcon icon={GraduationCapFreeIcons} size={32} />,
       heading: t("tutorial.cards.3.heading"),
      paragraph: t("tutorial.cards.3.paragraph")
    },
    {
      icon: <HugeiconsIcon icon={SpeechFreeIcons} size={32} />,
       heading: t("tutorial.cards.4.heading"),
      paragraph: t("tutorial.cards.4.paragraph")
    },
  ];

  const handleScheduleClick = () => {
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <SectionLayout id="tutorial">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10"
      >
        <Heading heading={t("tutorial.heading")} subHeading={t("tutorial.subHeading")} />

        <p className="max-w-full md:max-w-2xl text-base md:text-xl font-light text-[#22222299]">
          {t("tutorial.paragraph")}
        </p>
      </motion.div>

      {/* Tutorial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mt-10 md:mt-20">
        {tutorialData.map((tutorial, i) => (
          <TutorialCard key={i} tutorial={tutorial} index={i} />
        ))}
      </div>

      <div className="w-full flex justify-center items-center flex-wrap md:flex-nowrap gap-4 mt-15 md:mt-20">
        <Button
          onClick={handleScheduleClick}
          className="sm:w-auto min-w-55 h-12 px-8 bg-[#0245a8] hover:bg-[#0156d2]"
          variant="primary"
          size="lg"
        >
          {t("nav.scheduleTrial")}
        </Button>
      </div>
    </SectionLayout>
  );
}

// ======================================
// Tutorial Card
// ======================================

function TutorialCard({ tutorial, index }) {
  const isBlue = index % 2 !== 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      className={`
        col-span-1
        ${index >= 3 ? "md:col-span-3" : "md:col-span-2"}
        min-h-60 md:min-h-100
        flex flex-col justify-between
        p-8 md:p-12
        cursor-pointer
        ${isBlue ? "bg-[#0156D2] text-white" : "bg-[#F6F3EE] text-[#222222]"}
      `}
    >
      {/* Icon */}
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 2,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        {tutorial.icon}
      </motion.div>

      {/* Content */}
      <div>
        <h4 className="text-xl md:text-2xl font-medium">{tutorial.heading}</h4>

        <p className="text-base md:text-lg font-light mt-3 md:mt-4">
          {tutorial.paragraph}
        </p>
      </div>
    </motion.div>
  );
}
