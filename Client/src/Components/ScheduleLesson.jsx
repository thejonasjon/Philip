import Button from "./ui/Button";
import Scheldule from "../assets/scheldule.png"
import { Certificate01Icon, SpeechFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import bg from "../assets/overlay.png"
import { BOOKING_URL } from "../constants/links";



export default function ScheduleLesson() {

    const handleScheduleClick = () => {
          window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    };
  return (
    <section className="w-full ">
      <div className="relative overflow-hidden w-full min-h-auto md:min-h-118.75 bg-[linear-gradient(65deg,#1C1C7E_5%,#8B8FA8_35%,#DA554880_50%,#DA5548CC_80%)] px-6 md:px-8 py-16 md:py-0">
        <div className="absolute inset-0 w-full h-full bg-blend-multiply">
            <img src={bg} className="w-full h-full opacity-20" />
        </div>
        <div className="w-full md:min-h-118.75 flex flex-col justify-center gap-8 md:gap-10 relative z-50">
            <h3 className="max-w-full md:max-w-xl text-3xl md:text-5xl text-[#F7F4EF] font-medium leading-tight md:leading-15">
                Ready to put the fun back Into English?
            </h3>

            <div className="flex flex-col md:flex-row gap-4">
            <Button
            onClick={handleScheduleClick}
            className="w-full md:w-auto bg-[#F98272] text-base text-[#F7F4EF] py-3 font-medium hover:bg-[#f47766]">
                Schedule a Trial Lesson
            </Button>
            <Button
                className="group w-full md:w-auto flex items-center justify-center gap-2 bg-white px-4 shadow-xl hover:bg-[#f0f0f0]"
                variant="outline"
                size="lg"
            >
                <span className="text-base text-[#0156D2] font-medium md:hidden">
                    Verify Certification
                </span>
                <HugeiconsIcon icon={Certificate01Icon} className="text-2xl text-[#0156D2] transition-transform duration-300 ease-in-out group-hover:scale-110" />

            </Button>
            </div>

            {/* Mobile-only illustration with phonetic chips */}
            <div className="relative md:hidden h-72 mt-2">
                <div className="w-full absolute top-115 bottom-0 -right-32">
                    <img
                    src={Scheldule}
                    className="scale-350 object-cover object-top"
                />
                </div>

                <div className="absolute top-4 left-20 w-fit bg-white flex justify-center items-center gap-1.5 shadow-md shadow-[#8c8a8a] rounded-lg pl-1.5 pr-3 py-1 rotate-6">
                    <div className="bg-white rounded-lg shadow-sm shadow-[#a3a1a1] p-1">
                        <div className="bg-gray-400 p-1 rounded-lg">
                            <HugeiconsIcon icon={SpeechFreeIcons} className="text-xs" />
                        </div>
                    </div>
                    <div className="text-xs">
                        /'<span className="font-medium">In(g)lIj</span>/
                    </div>
                </div>

                <div className="absolute top-26 left-0 w-fit bg-white flex justify-center items-center gap-1.5 shadow-md shadow-[#8c8a8a] rounded-lg pl-1.5 pr-3 py-1 -rotate-10">
                    <div className="bg-white rounded-lg shadow-sm shadow-[#a3a1a1] p-1">
                        <div className="bg-[#fbe3d3] p-1 rounded-lg">
                            <HugeiconsIcon icon={SpeechFreeIcons} className="text-xs" />
                        </div>
                    </div>
                    <div className="text-xs">
                        /'<span className="font-medium">In.glif</span>/
                    </div>
                </div>

                <div className="absolute top-55 left-12 w-fit bg-white flex justify-center items-center gap-1.5 shadow-md shadow-[#8c8a8a] rounded-lg pl-1.5 pr-3 py-1 rotate-8">
                    <div className="bg-white rounded-lg shadow-sm shadow-[#a3a1a1] p-1">
                        <div className="bg-[#f8e3ee] p-1 rounded-lg">
                            <HugeiconsIcon icon={SpeechFreeIcons} className="text-xs" />
                        </div>
                    </div>
                    <div className="text-xs">
                        /'<span className="font-medium">lektfar</span>/
                    </div>
                </div>
            </div>
        </div>

        {/* Desktop-only illustration and phonetic chips (unchanged) */}
        <div className="hidden md:block">
            <div className="absolute bottom-45 left-110 w-fit bg-white flex justify-center items-center gap-2 shadow-lg shadow-[#666464] rounded-xl pl-2 pr-4 py-1.5 -rotate-15">
                <div className="bg-white rounded-xl shadow-sm shadow-[#a3a1a1] p-1.5">
                    <div className="bg-[#f8e3ee] p-1.5 rounded-xl">
                        <HugeiconsIcon icon={SpeechFreeIcons} className="text-base" />
                    </div>
                </div>
                <div className="text-base">
                    /'<span className="font-medium">lektfar</span>/
                </div>
            </div>

            <div className="absolute top-30 left-180 w-fit bg-white flex justify-center items-center gap-2 shadow-md shadow-[#8c8a8a] rounded-xl pl-2 pr-4 py-1.5 rotate-12">
                <div className="bg-white rounded-xl shadow-sm shadow-[#a3a1a1] p-1.5">
                    <div className="bg-[#f8e3ee] p-1.5 rounded-xl">
                        <HugeiconsIcon icon={SpeechFreeIcons} className="text-base" />
                    </div>
                </div>
                <div className="text-base">
                    /'<span className="font-medium">In(g)lIj</span>/
                </div>
            </div>

             <div className="absolute bottom-15 left-180 w-fit bg-white flex justify-center items-center gap-2 shadow-md shadow-[#8c8a8a] rounded-xl pl-2 pr-4 py-1.5 -rotate-10">
                <div className="bg-white rounded-xl shadow-sm shadow-[#a3a1a1] p-1.5">
                    <div className="bg-gray-400 p-1.5 rounded-xl">
                        <HugeiconsIcon icon={SpeechFreeIcons} className="text-base" />
                    </div>
                </div>
                <div className="text-base">
                    /'<span className="font-medium">In.glif</span>/
                </div>
            </div>
        </div>

        <div className="hidden md:block absolute max-w-450 -top-30 -right-180">
            <img src={Scheldule} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}