// src/Components/ui/CountrySelect.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { countries } from "../../data/countries";
import Flag from "./Flag";

/**
 * Searchable country dropdown with flags.
 *
 * Props:
 * - value: string          -> currently selected country NAME (kept as a plain
 *                              string so it drops straight into existing form state,
 *                              e.g. formData.country)
 * - onChange: (name: string) => void
 * - error: string          -> optional validation message, styled like the other fields
 * - placeholder: string
 * - name: string           -> passed through, matches your handleChange(e) pattern
 */
export default function CountrySelect({
  value,
  onChange,
  error,
  placeholder = "Select your country",
  name = "country",
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return countries;
    const q = query.trim().toLowerCase();
    return countries.filter((c) => c.name.trim().toLowerCase().includes(q));
  }, [query]);

  // Resolve the incoming `value` against the list case- and
  // whitespace-insensitively, and fall back to matching by ISO code —
  // this is what makes edit forms (where `value` comes from saved data,
  // not from selectCountry()) reselect correctly, even if countries.js
  // ever picks up stray whitespace again.
  const selected = useMemo(() => {
    if (!value) return undefined;
    const v = String(value).trim().toLowerCase();
    if (!v) return undefined;

    return (
      countries.find((c) => c.name.trim().toLowerCase() === v) ||
      countries.find((c) => c.code.trim().toLowerCase() === v)
    );
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setHighlighted(0);
      // focus the search box as soon as the panel opens
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const selectCountry = (country) => {
    onChange({ target: { name, value: country.name.trim() } });
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) selectCountry(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-[#f6f8fb] px-2.5 py-2 md:py-3 text-sm leading-8 text-[#222222] outline-none cursor-pointer transition-colors ${
          error
            ? "border-red-400"
            : "border-[#0145A814] focus:border-[#0245a8]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`flex items-center gap-2 truncate ${
            !selected ? "text-[#8a8a8a]" : ""
          }`}
        >
          {selected && <Flag code={selected.code} />}
          {selected ? selected.name.trim() : placeholder}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 text-[#605f5f] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-[#0145A814] bg-white shadow-lg">
          <div className="border-b border-[#0145A814] p-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`${t("reviewPage.selectPlaceholder")}...`}
              className="w-full rounded-md bg-[#f6f8fb] px-2.5 py-2 text-sm text-[#222222] outline-none"
            />
          </div>

          <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-[#8a8a8a]">
                No countries found
              </li>
            )}

            {filtered.map((country, i) => {
              const isSelected = selected?.code === country.code;
              return (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => selectCountry(country)}
                  className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm ${
                    i === highlighted ? "bg-[#f6f8fb]" : ""
                  } ${
                    isSelected ? "font-medium text-[#0245a8]" : "text-[#222222]"
                  }`}
                >
                  <Flag code={country.code} />
                  {country.name.trim()}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </div>
  );
}