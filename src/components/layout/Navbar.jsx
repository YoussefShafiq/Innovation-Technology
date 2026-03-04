import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { NAV_LINKS, SITE_NAME } from "../../constants/site";

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  const handleClose = () => setIsOpen(false);

  const activeLinkClass = ({ isActive }) =>
    [
      "relative text-sm font-semibold transition-colors duration-200 pb-0.5",
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full",
      "after:transition-all after:duration-300",
      isActive
        ? "text-primary after:w-full after:bg-primary"
        : "text-text-primary hover:text-primary after:w-0 hover:after:w-full after:bg-primary",
    ].join(" ");

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 backdrop-blur-md",
        "transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "bg-surface/95 shadow-soft border-b border-gray-100/80"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <Container>
        <nav className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={handleClose}
            className="flex items-center gap-2 group"
          >
            <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span className="text-xl font-display font-bold">
              <span className="text-secondary">{SITE_NAME.first}</span>
              <span className="text-primary">{SITE_NAME.second}</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={activeLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button size="sm" variant="primary" as={Link} onClick={() => {}}>
              <Link to="/contact" className="text-white font-semibold">
                Get in Touch
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Slide Menu */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="bg-surface/98 border-t border-gray-100 px-5 pt-4 pb-6">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    [
                      "block px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-text-primary hover:bg-gray-50 hover:text-primary",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              to="/contact"
              onClick={handleClose}
              className="block w-full text-center bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-dark transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
