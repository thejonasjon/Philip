import { motion } from "framer-motion";
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

export default function TutorialSection() {
  const tutorialData = [
    {
      icon: <HugeiconsIcon icon={ConversationFreeIcons} size={32} />,
      heading: "Conversational English",
      paragraph:
        "Real conversation from day one. Fluency, vocabulary and ease for everyday life.",
    },
    {
      icon: <HugeiconsIcon icon={BriefcaseBusinessFreeIcons} size={32} />,
      heading: "Business English",
      paragraph:
        "Meetings, presentations, emails and negotiation. Professional English with a native ear.",
    },
    {
      icon: <HugeiconsIcon icon={ContentWritingFreeIcons} size={32} />,
      heading: "Interview Preparations",
      paragraph:
        "Mock interviews, confident answers and the exact vocabulary of your industry.",
    },
    {
      icon: <HugeiconsIcon icon={GraduationCapFreeIcons} size={32} />,
      heading: "Exam Preparation",
      paragraph:
        "Targeted preparation for IELTS, Cambridge, TOEFL and other recognised English exams.",
    },
    {
      icon: <HugeiconsIcon icon={SpeechFreeIcons} size={32} />,
      heading: "Pronunciation & Fluency",
      paragraph:
        "Soften your accent, master proper English sounds and speak with rhythm and clarity.",
    },
  ];

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
        <Heading
          heading="Tutorial Focus"
          subHeading="Choose Your Focus"
        />

        <p className="max-w-full md:max-w-2xl text-base md:text-xl font-light text-[#22222299]">
          There's no fixed curriculum waiting for you to catch up to it.
          Every program starts where you are and moves at the pace you set;
          shaped around your goals, your level, and the life you're already
          living.
        </p>
      </motion.div>

      {/* Tutorial cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mt-10 md:mt-20">
        {tutorialData.map((tutorial, i) => (
          <TutorialCard
            key={i}
            tutorial={tutorial}
            index={i}
          />
        ))}
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
        ${
          isBlue
            ? "bg-[#0156D2] text-white"
            : "bg-[#F6F3EE] text-[#222222]"
        }
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
        <h4 className="text-xl md:text-2xl font-medium">
          {tutorial.heading}
        </h4>

        <p className="text-base md:text-lg font-light mt-3 md:mt-4">
          {tutorial.paragraph}
        </p>
      </div>
    </motion.div>
  );
}