import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { NAV_LINKS, SITE_NAME } from "../../constants/site";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClose = () => setIsOpen(false);

  /** Over dark hero (transparent top bar): light text. After scroll: dark text on solid surface. */
  const activeLinkClass = ({ isActive }) => {
    if (scrolled) {
      return [
        "relative text-sm font-semibold transition-colors duration-200 pb-0.5",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full",
        "after:transition-all after:duration-300",
        isActive
          ? "text-primary after:w-full after:bg-primary"
          : "text-text-primary hover:text-primary after:w-0 hover:after:w-full after:bg-primary",
      ].join(" ");
    }
    return [
      "relative text-sm font-semibold transition-colors duration-200 pb-0.5 drop-shadow-sm",
      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full",
      "after:transition-all after:duration-300",
      isActive
        ? "text-primary after:w-full after:bg-primary"
        : "text-white/90 hover:text-white after:w-0 hover:after:w-full after:bg-white/80",
    ].join(" ");
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 backdrop-blur-md",
        "transition-[background-color,box-shadow,border-color,color] duration-300",
        scrolled
          ? "bg-surface/95 shadow-soft border-b border-gray-100/80"
          : "bg-slate-950/25 border-b border-white/10 supports-[backdrop-filter]:bg-slate-950/20",
      ].join(" ")}
    >
      <Container>
        <nav className="flex items-center justify-between h-18 py-4">
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
              <span className={scrolled ? "text-secondary" : "text-white drop-shadow-sm"}>
                {SITE_NAME.first}
              </span>
              <span className="text-primary">{SITE_NAME.second}</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={activeLinkClass}>
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button size="sm" variant="primary" as={Link} onClick={() => {}}>
              <Link to="/contact" className="text-white font-semibold">
                {t("common.send_message")}
              </Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              className={[
                "p-2 rounded-lg transition-colors",
                scrolled
                  ? "text-text-primary hover:bg-gray-100"
                  : "text-white hover:bg-white/10 drop-shadow-sm",
              ].join(" ")}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={t("common.toggle_menu")}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </nav>
      </Container>

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
                  {t(link.label)}
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
              {t("common.send_message")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
