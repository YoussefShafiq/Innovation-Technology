import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import {
  MdCloudQueue,
  MdDns,
  MdHandshake,
  MdInventory2,
  MdLocalShipping,
  MdPhoneInTalk,
  MdPriceCheck,
  MdSecurity,
  MdSpeed,
  MdSupportAgent,
  MdVerified,
} from "react-icons/md";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const WHY_ICONS = [MdSpeed, MdSecurity, MdSupportAgent, MdPriceCheck];
const PILLAR_ICONS = [MdCloudQueue, MdSecurity, MdDns, MdPhoneInTalk];

export const HomeAboutStrip = () => {
  const { t } = useTranslation();
  const bullets = t("home.about_strip.bullets", { returnObjects: true });

  return (
    <section className="border-b border-gray-100 bg-background py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="left" distance={28}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("home.about_strip.who_tag")}</p>
            <h2 className="mb-6 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              {t("home.about_strip.title")}
            </h2>
            <p className="mb-6 text-text-secondary leading-relaxed">
              {t("home.about_strip.p1")}
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {(Array.isArray(bullets) ? bullets : []).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/about">
              <Button variant="primary" size="md" className="group">
                {t("home.about_strip.cta")}
                <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
              </Button>
            </Link>
          </Reveal>

          <Reveal delay={0.08} from="right" distance={28}>
            <Card hover={false} className="relative overflow-hidden border-primary/15 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-secondary/10 blur-3xl" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white/80 px-4 py-2 text-xs font-semibold text-text-secondary shadow-sm">
                  <MdVerified className="text-primary" size={18} />
                  {t("home.about_strip.card_badge")}
                </div>
                <p className="text-lg font-medium leading-relaxed text-text-primary">
                  {t("home.about_strip.card_p")}
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export const HomeWhyUs = () => {
  const { t, i18n } = useTranslation();
  const items = t("home.why.items", { returnObjects: true });

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <Reveal from="down" distance={22}>
          <SectionTitle
            tag={t("home.why.tag")}
            title={t("home.why.title")}
            subtitle={t("home.why.subtitle")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8">
          {(Array.isArray(items) ? items : []).map((item, i) => {
            const Icon = WHY_ICONS[i] ?? MdSpeed;
            return (
              <Reveal
                key={`${item.title}-${i18n.language}`}
                delay={0.06 * i}
                from={["left", "down", "down", "right"][i % 4]}
                distance={24}
              >
                <Card className="h-full">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={26} />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export const HomeFulfillment = () => {
  const { t, i18n } = useTranslation();
  const bullets = t("home.fulfillment.bullets", { returnObjects: true });

  return (
    <section className="border-y border-gray-100 bg-background py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="left" distance={26}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("home.fulfillment.tag")}</p>
            <h2 className="mb-6 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              {t("home.fulfillment.title")}
            </h2>
            <p className="mb-8 text-text-secondary leading-relaxed">
              {t("home.fulfillment.p1")}
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {(Array.isArray(bullets) ? bullets : []).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-primary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant="primary" size="md" className="group">
                {t("home.fulfillment.cta")}
                <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
              </Button>
            </Link>
          </Reveal>

          <Reveal delay={0.08} from="right" distance={28}>
            <Card hover={false} className="relative overflow-hidden border-gray-100 bg-gradient-to-br from-slate-50 to-white">
              <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <MdInventory2 size={30} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary">{t("home.fulfillment.card1_title")}</p>
                    <p className="text-xs text-text-secondary">{t("home.fulfillment.card1_sub")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MdLocalShipping size={30} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary">{t("home.fulfillment.card2_title")}</p>
                    <p className="text-xs text-text-secondary">{t("home.fulfillment.card2_sub")}</p>
                  </div>
                </div>
                <p className="text-center text-xs font-medium uppercase tracking-wider text-text-secondary">
                  {t("home.fulfillment.footer_note")}
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export const HomeProcess = () => {
  const { t } = useTranslation();
  const steps = t("home.process.steps", { returnObjects: true });

  return (
    <section className="border-y border-gray-100 bg-background py-20 lg:py-28">
      <Container>
        <Reveal from="up" distance={20}>
          <SectionTitle
            tag={t("home.process.tag")}
            title={t("home.process.title")}
            subtitle={t("home.process.subtitle")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {(Array.isArray(steps) ? steps : []).map((step, i) => (
            <Reveal
              key={step.n}
              delay={0.05 * i}
              from={["left", "down", "down", "right"][i % 4]}
              distance={22}
            >
              <div className="relative h-full rounded-2xl border border-gray-100 bg-surface p-6 shadow-card">
                <div className="mb-4 inline-flex h-10 min-w-[3.25rem] items-center justify-center rounded-xl bg-secondary/10 px-3 font-display text-sm font-extrabold text-secondary">
                  {step.n}
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export const HomePillars = () => {
  const { t, i18n } = useTranslation();
  const items = t("home.pillars.items", { returnObjects: true });

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <Reveal from="right" distance={24}>
          <SectionTitle
            tag={t("home.pillars.tag")}
            title={t("home.pillars.title")}
            subtitle={t("home.pillars.subtitle")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {(Array.isArray(items) ? items : []).map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? MdCloudQueue;
            return (
              <Reveal
                key={`${p.title}-${i18n.language}`}
                delay={0.06 * i}
                from={i % 2 === 0 ? "left" : "right"}
                distance={26}
              >
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                      <Icon size={26} />
                    </div>
                    <div>
                      <h3 className="mb-2 font-display text-xl font-bold text-text-primary">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.12} className="mt-12 text-center" from="up" distance={18}>
          <Link to="/services">
            <Button variant="outline" size="md" className="group">
              {t("home.pillars.cta")}
              <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
            </Button>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};

export const HomeTestimonials = () => {
  const { t, i18n } = useTranslation();
  const quotes = t("home.testimonials.quotes", { returnObjects: true });

  return (
    <section className="border-t border-gray-100 bg-background py-20 lg:py-28">
      <Container>
        <Reveal from="down" distance={22}>
          <SectionTitle
            tag={t("home.testimonials.tag")}
            title={t("home.testimonials.title")}
            subtitle={t("home.testimonials.subtitle")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {(Array.isArray(quotes) ? quotes : []).map((q, i) => (
            <Reveal
              key={`${q.name}-${i}-${i18n.language}`}
              delay={0.07 * i}
              from={["left", "up", "right"][i % 3]}
              distance={26}
            >
              <Card hover={false} className="h-full border-gray-100/80 bg-white">
                <MdHandshake className="mb-4 text-primary/90" size={28} />
                <p className="mb-6 text-sm leading-relaxed text-text-primary">&ldquo;{q.quote}&rdquo;</p>
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold text-text-primary">{q.name}</p>
                  <p className="text-xs text-text-secondary">{q.org}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
