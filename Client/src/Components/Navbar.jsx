import { useState } from "react";
import { X } from "lucide-react";
import NavLink from "./ui/NavLink";
import Button from "./ui/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Certificate01Icon, Menu02Icon } from "@hugeicons/core-free-icons";
import LanguageSelector from "./ui/LanguageSelector";
import useSectionNavigation from "../hooks/useSectionNavigation";
import { BOOKING_URL } from "../constants/links";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateToSection = useSectionNavigation();

  const navLinks = [
    { id: "home", label: "Home", to: "/" },
    { id: "about", label: "About Me", to: "/#aboutMe" },
    { id: "tutorials", label: "Tutorials", to: "/#tutorial" },
    { id: "testimonials", label: "Testimonials", to: "/testimonials" },
  ];

  const handleNavigation = (to) => {
    setMenuOpen(false);
    navigateToSection(to);
  };

  const handleScheduleClick = () => {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};

  return (
    <div className="fixed top-0 left-0 right-0 z-100 w-full bg-[#f7f4f0] shadow-[0px_2px_8px_0px_#00000014]">
      <div className="flex w-full items-center justify-between px-6 md:px-8 py-4">

        {/* Logo */}
        <div
          onClick={() => handleNavigation("/")}
          className="cursor-pointer text-lg font-semibold text-[#222222E5]"
        >
          Tutor Philips
        </div>

        {/* Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              linkText={link.label}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.to);
              }}
            />
          ))}
        </nav>

        {/* Right buttons - desktop */}
        <div className="hidden md:flex items-center justify-center gap-3">

          {/* <Button
            className="group hover:bg-[#f0f0f0]"
            variant="outline"
            size="lg"
          >
            <HugeiconsIcon
              icon={Certificate01Icon}
              className="text-2xl text-[#0245a8] transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </Button> */}

          <Button
            onClick={handleScheduleClick}
            className="bg-[#0245a8] hover:bg-[#0156d2]"
            variant="primary"
            size="lg"
          >
            Schedule a Trial Lesson
          </Button>

          <LanguageSelector
              onChange={(language) => {
                console.log("Selected language:", language.code);
              }} />

        </div>

        {/* Menu toggle - mobile */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden items-center justify-center text-[#222222E5] cursor-pointer"
        >
          {menuOpen ? <X size={26} /> : <HugeiconsIcon icon={Menu02Icon} size={26} className="text-[#6b6b6b]" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                linkText={link.label}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.to);
                }}
              />
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Button
             onClick={handleScheduleClick}
              className="w-full bg-[#0245a8] hover:bg-[#0156d2]"
              variant="primary"
              size="lg"
            >
              Schedule a Trial Lesson
            </Button>

            {/* <Button
                className="group w-full flex items-center justify-center gap-2 bg-white px-4 shadow-2xl hover:bg-gray-100"
                variant="outline"
                size="lg">
                    <span className="text-base text-[#0245a8] font-medium">
                        Verify Certification
                    </span>
                <HugeiconsIcon icon={Certificate01Icon} className="text-2xl text-[#0245a8] transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </Button> */}

            <div className="flex justify-center items-center gap-3">
              {/* <Button
                className="group flex-1 hover:bg-[#f0f0f0]"
                variant="outline"
                size="lg"
              >
                <HugeiconsIcon
                  icon={Certificate01Icon}
                  className="text-2xl text-[#0245a8] transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </Button> */}


              <LanguageSelector
              onChange={(language) => {
                console.log("Selected language:", language.code);
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}