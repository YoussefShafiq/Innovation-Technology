const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  tag = "Discover",
  className = "",
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {/* Badge tag */}
      {tag && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {tag}
        </span>
      )}

      {/* Main title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative accent line */}
      <div className={`flex gap-1 mt-1 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-1 w-10 rounded-full bg-primary" />
        <span className="h-1 w-4 rounded-full bg-secondary" />
        <span className="h-1 w-2 rounded-full bg-primary/40" />
      </div>
    </div>
  );
};

export default SectionTitle;
