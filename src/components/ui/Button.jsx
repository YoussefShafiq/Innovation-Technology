const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-glow active:scale-95",
  secondary:
    "bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-glow-secondary active:scale-95",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-95",
  ghost:
    "bg-transparent text-primary hover:bg-primary/10 active:scale-95",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold rounded-xl",
        "transition-all duration-300 cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
