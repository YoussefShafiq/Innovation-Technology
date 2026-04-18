import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
const initials = (name) => {
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const PartnerLogo = ({ partner }) => (
  <div className="flex h-[72px] w-[148px] shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm ring-1 ring-black/[0.04] sm:h-20 sm:w-[168px]">
    {partner.logo ? (
      <img src={partner.logo} alt="" className="max-h-10 w-auto max-w-[120px] object-contain opacity-90" loading="lazy" decoding="async" />
    ) : (
      <span className="font-display text-sm font-extrabold tracking-tight text-text-secondary/90">{initials(partner.name)}</span>
    )}
  </div>
);

/**
 * Infinite horizontal marquee of partner logos (auto-scroll). Pauses on hover.
 * With prefers-reduced-motion, shows a static responsive grid instead.
 */
const PartnersLogoMarquee = ({ partners = [] }) => {
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const list = Array.isArray(partners) ? partners : [];
  const track = [...list, ...list];

  if (list.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-gray-100 bg-surface py-20 lg:py-24">
      <Container>
        <SectionTitle
          tag={t("home.partners.tag")}
          title={t("home.partners.title")}
          subtitle={t("home.partners.subtitle")}
          className="mb-10"
        />

        {prefersReduced ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
            {list.map((p) => (
              <PartnerLogo key={p.id} partner={p} />
            ))}
          </div>
        ) : (
          /* dir="ltr" keeps flex order + translateX(-50%) loop seamless; RTL on <html> reverses flex and breaks the duplicate-half trick */
          <div
            className="relative overflow-hidden rounded-2xl border border-gray-100/80 bg-gradient-to-b from-white to-gray-50/90 py-8 shadow-inner"
            dir="ltr"
          >
            <div className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-16 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 end-0 z-[1] w-16 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
            <div className="partner-marquee-track flex w-max items-center gap-8 ps-8">
              {track.map((p, i) => (
                <PartnerLogo key={`${p.id}-${i}`} partner={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default PartnersLogoMarquee;
