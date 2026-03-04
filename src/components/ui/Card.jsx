const Card = ({ children, className = "", hover = true, padding = true }) => {
  return (
    <div
      className={[
        "bg-surface rounded-2xl shadow-card border border-gray-100",
        padding ? "p-6 sm:p-8" : "",
        hover
          ? "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/20"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;
