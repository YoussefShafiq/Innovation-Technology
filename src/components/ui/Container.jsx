const Container = ({ children, className = "", as: Tag = "div" }) => {
  return (
    <Tag className={`container mx-auto px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
};

export default Container;
