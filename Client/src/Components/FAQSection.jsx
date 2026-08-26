import { useState } from "react";
import Heading from "./ui/Heading";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MinusSignIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import SectionLayout from "../layouts/SectionLayout";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const FAQ = [
  {
    question:
      "Do I need to already speak some English, or can I start from zero?",
    answer:
      "We welcome learners at every stage, whether you are starting completely from zero or looking to advance your fluency. Our lessons cover everything from beginner foundations to advanced English, ensuring you receive targeted support tailored precisely to your current proficiency level. This is beneficial because it eliminates intimidation for absolute beginners while providing rigorous, high-level challenges for advanced speakers wanting to polish their skills.",
  },

  {
    question:
      "Can I learn at my own pace, or is there a fixed program?",
    answer:
      "We believe in a fully flexible learning experience where you can learn at your own pace with no rigid or fixed program holding you back. We structure your lessons around your personal schedule and learning speed. This is beneficial because it removes the pressure of rushed course structures, allowing you to thoroughly master concepts, build genuine confidence, and achieve lasting conversational fluency without burnout.",
  },

  {
    question: "What kind of materials will be used?",
    answer:
      "We design completely custom materials built around your unique preferences and objectives. Every student is interviewed and given a detailed questionnaire, which we use to craft bespoke resources tailored specifically to your exact needs, current level, and personal interests. This is beneficial because it ensures every single minute of your lesson time is relevant, engaging, and directly aligned with your real-world communication goals.",
  },

  {
    question: "What do I need to start learning?",
    answer:
      "We keep the barrier to entry minimal. All you need is a reliable internet connection and the determination to become a better speaker. This is beneficial because it allows you to start your language-learning journey immediately from the comfort of your home, focusing entirely on your growth without worrying about complicated software or expensive physical textbooks.",
  },

  {
    question:
      "How will these lessons actually help me speak with confidence in real life?",
    answer:
      "We focus intensely on practical, conversational communication rather than just memorizing grammar rules out of a textbook. We design every session around real-world scenarios you care about; whether that's advancing your career, traveling, or socializing effortlessly. This is beneficial because it bridges the gap between classroom theory and daily application, ensuring you can open your mouth and speak English naturally and confidently outside of class from day one.",
  },
];

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  };

  return (
    <SectionLayout>
      <div className="mx-auto mb-8 flex max-w-160 flex-col items-start justify-between gap-1 md:flex-row">
        <Heading
          heading="Frequently Asked Questions"
          subHeading=""
        />
      </div>

      <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-5 md:mt-20 md:space-y-6">
        {FAQ.map((faq, i) => (
          <FAQCard
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </SectionLayout>
  );
}

function FAQCard({
  question,
  answer,
  isOpen,
  onToggle,
}) {
  return (
    <div
      onClick={onToggle}
      className="
        mx-auto w-full max-w-222
        cursor-pointer
        rounded-2xl
        border border-[#eae7e7]
        bg-[linear-gradient(180deg,#FFFFFF_0%,#ABABAB0F_100%)]
        p-5
        shadow-[0_0_0_0.95px_#EAEAEA80,0_0.97px_2.92px_0_#8F8F8F1A,inset_0_-1.53px_0_0_#3D3D3D0A]

        sm:rounded-3xl
        sm:p-6

        md:p-8
      "
    >
      <div className="flex items-start justify-between gap-4 sm:gap-6">
        {/* Question + Answer */}
        <div className="min-w-0 flex-1">
          <h4
            className="
              text-lg
              font-medium
              leading-7
              text-[#222222]

              sm:text-xl
              sm:leading-8

              md:text-2xl
              md:leading-8
            "
          >
            {question}
          </h4>

          {/* Smooth answer animation */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p
                className="
                  mt-2
                  pt-2
                  text-base
                  font-light
                  leading-7
                  text-[#22222299]

                  sm:mt-3
                  sm:pt-3
                  sm:text-lg
                  sm:leading-8

                  md:text-2xl
                  md:leading-10
                "
              >
                {answer}
              </p>
            </div>
          </div>
        </div>

        {/* Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="
            flex
            h-7
            w-7
            shrink-0
            cursor-pointer
            items-center
            justify-center

            sm:h-8
            sm:w-8
          "
        >
          {isOpen ? (
            <HugeiconsIcon
              icon={MinusSignIcon}
              size={22}
              className="text-[#5C5C5C] transition-transform duration-500 sm:size-[25px]"
            />
          ) : (
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={22}
              className="text-[#5C5C5C] transition-transform duration-500 sm:size-[25px]"
            />
          )}
        </button>
      </div>
    </div>
  );
}