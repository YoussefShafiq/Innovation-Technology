import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
} from "react-icons/hi";
import Container from "../ui/Container";
import { NAV_LINKS, SITE_NAME, CONTACT_INFO } from "../../constants/site";

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-1.5 group"
    >
      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
  >
    <Icon size={15} />
  </a>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark text-white">
      {/* Main footer */}
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <span className="text-xl font-display font-bold">
                <span className="text-white">{SITE_NAME.first}</span>
                <span className="text-primary">{SITE_NAME.second}</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering businesses with cutting-edge technology solutions that drive growth, efficiency, and digital transformation.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              <SocialIcon href="#" icon={FaFacebookF} label="Facebook" />
              <SocialIcon href="#" icon={FaTwitter}   label="Twitter"  />
              <SocialIcon href="#" icon={FaLinkedinIn} label="LinkedIn" />
              <SocialIcon href="#" icon={FaInstagram} label="Instagram" />
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-gray-400 text-sm leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm group">
                  <HiPhone className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm group">
                  <HiMail className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {year} <span className="text-gray-400">{SITE_NAME.first}{SITE_NAME.second}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">·</span>
            <Link to="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
