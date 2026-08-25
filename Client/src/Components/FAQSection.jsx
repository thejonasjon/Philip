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
        "You can start from absolute zero. Honestly, some of my favourite students walked in knowing three words and left correcting my English.",
    },
    {
      question:
        "Can I learn at my own pace, or is there a fixed program?",
      answer:
        "You can start from absolute zero. Honestly, some of my favourite students walked in knowing three words and left correcting my English.",
    },
    {
      question: "What age groups or levels do you teach?",
      answer:
        "You can start from absolute zero. Honestly, some of my favourite students walked in knowing three words and left correcting my English.",
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