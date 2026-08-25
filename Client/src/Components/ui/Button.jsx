import { cn } from "../../lib/utils";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transform transition-all duration-300 ease-in-out hover:scale-101 cursor-pointer";

  const variants = {
    none: "",
    primary: "text-white bg-[#0156D2] hover:bg-[#0156D2]",
    secondary: "text-[#0156D2] bg-gray-100 hover:bg-gray-200",
    outline: "text-[#0156D2] border border-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-[10px]",
    md: "px-4 py-2 text-sm md:text-base",
    lg: "px-8 py-3",
    xl: "px-12 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      type={props.type || "button"}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}