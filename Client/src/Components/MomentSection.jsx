import Heading from "./ui/Heading";
import Button from "./ui/Button";
import MomentOne from "../assets/moment-1.png";
import MomentTwo from "../assets/moment-2.png";
import MomentThree from "../assets/moment-3.png";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import bg from "../assets/overlay.png"
import texture from "../assets/texture.png"
import SectionLayout from "../layouts/SectionLayout";

export default function MomentSection() {
  return (
    <SectionLayout>
      {/* Section heading */}
      <div className="max-w-full md:max-w-160 flex items-start justify-between gap-1 mb-6 md:mb-8">
        <Heading
          heading="Some of my favourite moments with students"
          subHeading=""
        />
      </div>

      {/* Mobile - Stacked cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Card 1 */}
        <div className="flex flex-col overflow-hidden rounded-3xl border-[0.2px] border-[#22222220] bg-[#f8f8f8] p-4">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={MomentOne}
              alt="Student testimonial"
              className="w-full h-64 object-cover object-[30%_20%]"
            />
          </div>

          <div className="pt-6 px-2 pb-2 text-xl leading-tight text-[#a2a2a2]">
            <span className="font-semibold text-[#222222]">Some students just send</span> a
            thank-you email.
          </div>
        </div>

        {/* Card 2 - Mine booked flights */}
        <div className="relative flex justify-center items-center overflow-hidden rounded-3xl bg-[#F98272] p-10 min-h-45 text-white">
          <div className="text-center text-3xl text-[#FEFEFE] font-bold leading-[1.1]">
            Mine booked flights
          </div>
          <div className="absolute inset-0 w-full h-full bg-blend-multiply">
            <img src={bg} className="w-full h-full object-cover opacity-50" />
          </div>
          <div className="absolute inset-0 w-full h-full bg-blend-multiply">
            <img src={texture} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Card 2b - image */}
        <div className="rounded-3xl overflow-hidden">
          <img
            src={MomentTwo}
            alt="Student testimonial"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-3xl border-[0.2px] border-[#22222220] bg-[linear-gradient(to_right,#bbc4e8,#eee1de)] p-6 min-h-90">
          <div className="absolute -right-20 -bottom-16">
            <img
              src={MomentThree}
              alt="Student testimonial"
              className="w-40 object-cover"
            />
            <div className="w-full h-full absolute top-0 bg-[#978e8e] opacity-100 mix-blend-color blur-2xl" />
          </div>
          <div className="absolute -left-20 bottom-0 w-full h-full bg-[#2B59FF]/20 blur-[80px] z-10" />
          <div className="absolute w-40 right-4 h-40 bg-[#F98272] blur-[120px] z-10" />

          <p className="relative z-10 max-w-11/12 text-xl leading-8 text-left text-[#625c5c]">
            <span className="text-xl text-[#222222] font-bold">
              ...I didn't ask anyone to fly in. They just did. If you want to
              know what kind of
            </span>{" "}
            tutor I am, that's your answer right there!
          </p>
        </div>
      </div>

      {/* Desktop - Original grid layout (unchanged) */}
      <div className="hidden md:grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:grid-rows-2">
        {/* Card 1 - Left / Full Height */}
        <div className="row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl border-[0.2px] border-[#22222220] bg-[#f8f8f8] px-4 pt-4">
          <div className="flex flex-1 items-center justify-center rounded-2xl overflow-hidden p-4">
            <img
              src={MomentOne}
              alt="Student testimonial"
              className="h-full w-full object-cover rounded-2xl scale-320 object-[30%_10%] -mb-120"
            />
          </div>

          <div className="flex items-center justify-between gap-6 p-8 text-[28px] leading-tight text-[#a2a2a2]">
            <div>
              <span className="font-semibold text-[#222222]">Some students just send</span> a
              thank-you email.
            </div>

            <Button className="size-12 shrink-0 rounded-full bg-[#0145A7] p-0">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
            </Button>
          </div>
        </div>

        {/* Card 2 - Top Middle */}
        <div className="flex gap-6 w-full h-full overflow-hidden">
          <div className="relative w-full flex justify-center items-center rounded-3xl bg-[#F98272] p-8 text-[28px] leading-tight text-white">
            <div className="max-w-50 text-center text-[40px] text-[#FEFEFE] font-bold leading-[1.1]">
              Mine booked flights
            </div>
                <div className="absolute inset-0 w-full h-full bg-blend-multiply">
                    <img src={bg} className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="absolute inset-0 w-full h-full bg-blend-multiply">
                    <img src={texture} className="w-full h-full object-cover" />
                </div>
          </div>

          <div className="w-full h-full rounded-3xl overflow-hidden">
            <img
              src={MomentTwo}
              alt="Student testimonial"
              className="h-full w-4000 object-cover rounded-3xl rotate-90 scale-140"
            />
          </div>
        </div>

        {/* Card 3 - Top Right */}
        <div className="relative flex w-full items-end overflow-hidden rounded-3xl border-[0.2px] border-[#22222220] bg-[linear-gradient(to_right,#bbc4e8,#eee1de)] p-8">
          {/* <div className="w-full h-full bg-[#F8F8F8]/10 absolute inset-0 z-100" /> */}
          <div className="absolute -left-55 -bottom-100">
            <img
              src={MomentThree}
              alt="Student testimonial"
              className="max-w-3/6 object-cover"
            />
            <div className="w-full h-full absolute top-0 bg-[#978e8e] opacity-100 mix-blend-color blur-2xl" />
          </div>
           <div className="absolute -left-120 -bottom-20 w-full h-full bg-[#2B59FF]/20 blur-[80px] z-10" />
            <div className="absolute w-55.5 right-20 h-46.5 bg-[#F98272] blur-[180px] z-10"  />
          <div className="flex items-end z-10">
            <div className="w-1/2"></div>

            <p className="max-w-9/12 self-end text-[22px] leading-10 text-right tracking-[0px] align-middle text-[#625c5c]">
              <span className="text-2xl text-[#222222] font-bold">
                ...I didn't ask anyone to fly in. They just did. If you want to
                know what kind of
              </span>{" "}
              tutor I am, that's your <br />
              answer right there!
            </p>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}