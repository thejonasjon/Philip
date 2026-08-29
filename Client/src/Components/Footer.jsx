import { ArrowUpRight03FreeIcons } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import tutorPhilps from "../assets/tutorPhilps.png";
import LanguageSelector from "./ui/LanguageSelector";
import useSectionNavigation from "../hooks/useSectionNavigation";

export default function Footer() {
  const navigateToSection = useSectionNavigation();
  const { t } = useTranslation();

  const socialLinks = [
    { name: "X", link: "https://x.com/osephilips", external: true },
    { name: "TikTok", link: "https://www.tiktok.com/@philips5587", external: true },
    {name: "LinkedIn",link: "https://www.linkedin.com/in/osose-ijewere-tefl", external: true},
    { name: "Whatsapp", link: "https://wa.me/447473344313", external: true },
    { name: "Instagram", link: "https://www.instagram.com/ose_philips", external: true },
    { name: t("footer.hello.links.0"), link: "/#contact" },
    { name: t("footer.hello.links.1"), link: "/testimonials" },
  ];

  // These match the same "to" format Navbar uses, so useSectionNavigation
  // handles them identically (scroll on current page, or navigate then scroll)
  const exploreLinks = [
    { name: t("footer.explore.links.0"), link: "/" },
    { name: t("footer.explore.links.1"), link: "/#aboutMe" },
    { name: t("footer.explore.links.2"), link: "/#tutorial" },
    { name: t("footer.explore.links.3"), link: "/testimonials" },
    // { name: t("footer.explore.3"), link: "#" },
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
              {t("footer.paragraph")}
            </div>
          </div>

          {/* Country / Language */}
          <div className="order-2 md:order-4">
            <LanguageSelector />
          </div>

          {/* Say Hello */}
          <div className="order-3 w-full flex flex-col gap-6 md:order-2">
            <h3 className="text-2xl text-[#22222226] font-bold">{t("footer.hello.text")}</h3>

            <div className="w-full flex flex-col gap-3">
              {socialLinks.map((socialLink, i) => (
                <FooterLink
                  key={i}
                  to={socialLink.link}
                  text={socialLink.name}
                  external={socialLink.external}
                  onClick={socialLink.name === "Email" ?
                    (e) => {
                    e.preventDefault();
                    navigateToSection(socialLink.link);} :
                    undefined
                  }
                />
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="order-4 w-full flex flex-col gap-6 md:order-3">
            <h3 className="text-2xl text-[#22222226] font-bold">{t("footer.explore.text")}</h3>

            <div className="w-full flex flex-col gap-3">
              {exploreLinks.map((exploreLink, i) => (
                <FooterLink
                  key={i}
                  to={exploreLink.link}
                  text={exploreLink.name}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(exploreLink.link);
                  }}
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

function FooterLink({ to, text, onClick, external = false }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
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
