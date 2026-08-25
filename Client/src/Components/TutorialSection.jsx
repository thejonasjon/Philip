import { GraduationCap, GraduationCapIcon, MessageCircle, NotebookPen, SpeechIcon } from "lucide-react";
import Heading from "./ui/Heading";
import { HugeiconsIcon } from "@hugeicons/react";
import { BriefcaseBusinessFreeIcons, BriefcaseBusinessIcon, ContentWritingFreeIcons, ContentWritingIcon, ConversationFreeIcons, ConversationIcon, GraduationCapFreeIcons, SpeechFreeIcons } from "@hugeicons/core-free-icons";
import SectionLayout from "../layouts/SectionLayout";

export default function TutorialSection(){
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
        icon: <HugeiconsIcon icon={ContentWritingFreeIcons} size={32}/>,
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
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-10">
          <Heading
            heading="Tutorial Focus"
            subHeading="Choose Your Focus"
          />

          <p className="max-w-full md:max-w-2xl text-base md:text-xl font-light text-[#22222299]">
            There's no fixed curriculum waiting for you to catch up to it. Every
            program starts where you are and moves at the pace you set; shaped
            around your goals, your level, and the life you're already living.
          </p>
        </div>

        {/* Tutorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 mt-10 md:mt-20">
          {tutorialData.map((tutorial, i) => (
            <TutorialCard
              key={i}
              props={{
                ...tutorial,
                bgColor: i % 2 === 0 ? "bg-#F6F3EE" : "bg-[#0156D2] text-white",
                className: i >= 3 ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2",
              }}
            />
          ))}
        </div>
      </SectionLayout>
    )
}

// Tutorial Card Component
function TutorialCard({ props }) {
  return (
    <div className={`${props.className || ""} min-h-60 md:min-h-100 flex flex-col justify-between p-8 md:p-12 ${props.bgColor}`}>
      <div>{props.icon}</div>

      <div>
        <h4 className="text-xl md:text-2xl font-medium">{props.heading}</h4>

        <p className="text-base md:text-lg font-light mt-3 md:mt-4">{props.paragraph}</p>
      </div>
    </div>
  );
}