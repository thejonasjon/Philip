import { useNavigate, useLocation } from "react-router-dom";

export default function useSectionNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return function handleNavigation(to) {
    // Testimonials is a separate page
    if (to === "/testimonials") {
      navigate("/testimonials");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Home
    if (to === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    // Section anchors, e.g. "/#aboutMe"
    const hash = to.split("#")[1];

    if (location.pathname === "/") {
      const section = document.getElementById(hash);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // If we're on another page, go home first, then scroll
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(hash);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };
}