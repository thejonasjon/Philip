import { Link, useLocation } from "react-router-dom";

export default function NavLink({ to, linkText, onClick }) {
  const location = useLocation();

  const [toPath, toHash] = to.split("#");
  const normalizedToPath = toPath || "/";

  const isActive = toHash
    ? location.pathname === normalizedToPath && location.hash === `#${toHash}`
    : location.pathname === normalizedToPath && !location.hash;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative flex items-center justify-center py-1 text-base transition-colors duration-300 ease-in-out hover:text-[#1C1C7F] ${
        isActive ? "text-[#1C1C7F]" : "text-[#22222299]"
      }`}
    >
      <span
        className={`relative transition-all duration-300 ease-in-out group-hover:font-bold ${
          isActive ? "font-bold" : ""
        }`}
      >
        {linkText}

        <span
          className={`absolute left-0 -bottom-1 h-0.5 bg-[#1C1C7F] transition-all duration-300 ease-in-out group-hover:w-full ${
            isActive ? "w-full" : "w-0"
          }`}
        />
      </span>
    </Link>
  );
}