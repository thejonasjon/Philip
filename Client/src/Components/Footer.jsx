import { ArrowUpRight03FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { ChevronRight } from "lucide-react";
import tutorPhilps from "../assets/tutorPhilps.png"
import LanguageSelector from "./ui/LanguageSelector";

export default function Footer() {
  const socialLinks = [
    {
      name: "X",
      link: "#",
    },
    {
      name: "LinkedIn",
      link: "#",
    },
    {
      name: "Whatsapp",
      link: "#",
    },
    {
      name: "Instagram",
      link: "#",
    },
    {
      name: "Email",
      link: "#",
    },
    {
      name: "Leave a Review",
      link: "#",
    },
  ];

  const exploreLinks = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "About Me",
      link: "#",
    },
    {
      name: "Tutorial",
      link: "#",
    },
    {
      name: "Testimonials",
      link: "#",
    },
    {
      name: "Verify Certification",
      link: "#",
    },
  ];
  return (
    <footer>
      <div className="w-11/12 mx-auto pb-20">
  <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:items-start md:gap-7">

    {/* Tutor Phillips */}
    <div className="order-1 w-full flex flex-col gap-6 md:order-1">
      <h3 className="text-2xl text-[#222222E5] font-semibold leading-4">
        Tutor Phillps
      </h3>

      <div className="max-w-full md:max-w-3/6 text-lg text-[#22222299] font-light leading-8">
        I am an experienced online ESL tutor with TEFL and TEO
        qualifications. With over 7 years of teaching experience.
      </div>
    </div>

    {/* Country / Language */}
    <div className="order-2 md:order-4">
      <LanguageSelector
    onChange={(language) => {
      console.log("Selected language:", language.code);
    }}
  />
    </div>

    {/* Say Hello */}
    <div className="order-3 w-full flex flex-col gap-6 md:order-2">
      <h3 className="text-2xl text-[#22222226] font-bold">
        Say hello!
      </h3>

      <div className="w-full flex flex-col gap-3">
        {socialLinks.map((socialLink, i) => (
          <FooterLink
            key={i}
            to={socialLink.link}
            text={socialLink.name}
          />
        ))}
      </div>
    </div>

    {/* Explore */}
    <div className="order-4 w-full flex flex-col gap-6 md:order-3">
      <h3 className="text-2xl text-[#22222226] font-bold">
        Explore
      </h3>

      <div className="w-full flex flex-col gap-3">
        {exploreLinks.map((exploreLink, i) => (
          <FooterLink
            key={i}
            to={exploreLink.link}
            text={exploreLink.name}
          />
        ))}
      </div>
    </div>

  </div>
</div>
        <div className="w-full">
            <img src={tutorPhilps} className="w-full object-center" />
        </div>
    </footer>
  );
}

function FooterLink({ to, text }) {
  return (
    <Link
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-sm font-light leading-6 text-[#22222299] hover:text-[#0245a8] underline transition-transform duration-300 ease-in-out origin-left hover:scale-105"
    >
      {text}

      <HugeiconsIcon
        icon={ArrowUpRight03FreeIcons}
        size={16}
        strokeWidth={1.5}
      />
    </Link>
  );
}