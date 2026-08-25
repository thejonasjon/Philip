import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const STORAGE_KEY = "tp-language";
const DROPDOWN_WIDTH = 224; // w-56
const VIEWPORT_MARGIN = 12;

export default function LanguageSelector({
  value,
  onChange,
  persist = true,
  className = "",
}) {
  const isControlled = value !== undefined;

  const [internalCode, setInternalCode] = useState(() => {
    if (isControlled) return value;
    if (persist && typeof window !== "undefined") {
      return window.localStorage.getItem(STORAGE_KEY) || "en";
    }
    return "en";
  });

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const activeCode = isControlled ? value : internalCode;
  const activeLanguage =
    LANGUAGES.find((lang) => lang.code === activeCode) || LANGUAGES[0];

  // Compute where the dropdown should sit, anchored to the button,
  // clamped so it never overflows off the right/left edge of the screen.
  const updatePosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Prefer aligning the dropdown's right edge with the button's right edge
    let left = rect.right - DROPDOWN_WIDTH;

    // Clamp within viewport
    if (left < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN;
    if (left + DROPDOWN_WIDTH > viewportWidth - VIEWPORT_MARGIN) {
      left = viewportWidth - DROPDOWN_WIDTH - VIEWPORT_MARGIN;
    }

    setCoords({
      top: rect.bottom + 8,
      left,
    });
  }, []);

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  // Close on outside click / Escape, reposition on resize / scroll
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      const clickedButton = buttonRef.current?.contains(e.target);
      const clickedDropdown = dropdownRef.current?.contains(e.target);

      if (!clickedButton && !clickedDropdown) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const handleSelect = (language) => {
    if (!isControlled) {
      setInternalCode(language.code);
    }

    if (persist && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language.code);
    }

    onChange?.(language);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group flex items-center gap-1.5 rounded-xl border border-[#0245a8] px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-[#f0f0f0] cursor-pointer"
      >
        <span className="text-xl leading-none">{activeLanguage.flag}</span>

        <span className="text-sm font-medium uppercase leading-6.5 text-[#0245a8]">
          {activeLanguage.code}
        </span>

        <ChevronDown
          size={18}
          className={`text-[#6b6b6b] transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: DROPDOWN_WIDTH,
            }}
            className="z-999 max-h-80 overflow-y-auto rounded-2xl border border-[#0000001a] bg-white p-2 shadow-[0_8px_24px_0px_#00000014]"
          >
            {LANGUAGES.map((language) => {
              const isActive = language.code === activeLanguage.code;

              return (
                <button
                  key={language.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(language)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ease-in-out hover:bg-[#f6f8fb] cursor-pointer ${
                    isActive ? "bg-[#f0f5ff]" : ""
                  }`}
                >
                  <span className="text-xl leading-none">{language.flag}</span>

                  <span className="flex-1 text-sm font-medium text-[#222222]">
                    {language.name}
                  </span>

                  {isActive && <Check size={16} className="text-[#0245a8]" />}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}