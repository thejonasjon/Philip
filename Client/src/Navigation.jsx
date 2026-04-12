import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./services/api";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const showLogout = location.pathname === "/dashboard"; // Only show logout on dashboard
  const showNavbar = location.pathname !== "/login"; // Hide navbar on login

  const navItems = React.useMemo(
    () => [
      { id: "home", label: "Home", href: "#home" },
      { id: "about", label: "About Me", href: "#about" },
      { id: "testimonials", label: "Testimonials", href: "#testimonials" },
      { id: "contact", label: "Contact Me", href: "#contact" },
    ],
    []
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return showNavbar ? (
    <nav className="bg-gray-900 px-6 py-4 shadow-lg fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Tutor Philips</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 items-center">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => scrollToSection(item.id, e)}
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
              activeSection === item.id
                ? "text-orange-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {item.label}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-orange-400 transition-all duration-300 ${
                activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
            <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded" />
          </a>
        ))}

        {showLogout && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-gray-100 px-4 py-1.5 rounded hover:bg-gray-200 transition duration-200 cursor-pointer"
          >
            Log Out
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 mt-4">
          <div className="px-6 py-4 space-y-4 text-center">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.id}`}
                href={item.href}
                onClick={(e) => scrollToSection(item.id, e)}
                className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id ? "text-white bg-orange-500" : "text-white hover:bg-gray-700"
                }`}
              >
                {item.label}
                {activeSection === item.id && <div className="w-8 h-0.5 bg-white mx-auto mt-1"></div>}
              </a>
            ))}

            {showLogout && (
              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 px-4 py-1.5 rounded hover:bg-gray-200 transition duration-200"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  ) : null;
};

export default Navigation;