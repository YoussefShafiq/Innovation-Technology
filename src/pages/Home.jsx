import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import { ServiceCard, ServiceCardSkeleton } from "../components/ui/ServiceCard";
import Reveal from "../components/ui/Reveal";
import PartnersLogoMarquee from "../components/home/PartnersLogoMarquee";
import {
  HomeAboutStrip,
  HomeFulfillment,
  HomePillars,
  HomeProcess,
  HomeTestimonials,
  HomeWhyUs,
} from "../components/home/HomeExtendedSections";
import { API_URL } from "../constants/site";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=1100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=1100&fit=crop&q=80",
];

const TRUST_KEYS = ["iso_certified", "uptime_sla", "support_24"];

const useTypingWords = (
  words,
  {
    typeSpeedMs = 70,
    deleteSpeedMs = 45,
    pauseAfterTypeMs = 1100,
    pauseAfterDeleteMs = 250,
  } = {}
) => {
  const safeWords = useMemo(
    () => (Array.isArray(words) ? words.filter(Boolean) : []),
    [words]
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeWords.length) return;

    const current = safeWords[wordIndex % safeWords.length];
    const isFullyTyped = text === current;
    const isEmpty = text.length === 0;

    let delay = isDeleting ? deleteSpeedMs : typeSpeedMs;
    if (!isDeleting && isFullyTyped) delay = pauseAfterTypeMs;
    if (isDeleting && isEmpty) delay = pauseAfterDeleteMs;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (isFullyTyped) {
          setIsDeleting(true);
          return;
        }
        setText(current.slice(0, text.length + 1));
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % safeWords.length);
        return;
      }
      setText((prev) => prev.slice(0, prev.length - 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [
    safeWords,
    wordIndex,
    text,
    isDeleting,
    typeSpeedMs,
    deleteSpeedMs,
    pauseAfterTypeMs,
    pauseAfterDeleteMs,
  ]);

  return { text, wordIndex };
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const heroWords = useMemo(
    () => t("home.hero.hero_words", { returnObjects: true }),
    [t, i18n.language]
  );
  const { text, wordIndex } = useTypingWords(heroWords);

  return (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -end-32 w-[520px] h-[520px] rounded-full bg-primary/[0.07] blur-[100px]" />
      <div className="absolute -bottom-48 -start-40 w-[480px] h-[480px] rounded-full bg-secondary/[0.2] blur-[100px]" />
      <div className="absolute top-[38%] start-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-secondary-light/[0.06] blur-[120px]" />
    </div>

    <Container className="relative z-10 pt-32 pb-24 lg:pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* ── Left: copy ── */}
        <div className="lg:col-span-6">
          <Reveal from="left" distance={22}>
            <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-sm text-white/85">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-medium">{t("home.hero.badge")}</span>
            </div>
          </Reveal>

          <Reveal from="left" distance={22} delay={0.05}>
            <h1 className="mt-7 font-display font-extrabold text-white leading-[1.05] text-4xl sm:text-5xl xl:text-6xl">
              <span className="block">{t("home.hero.title_part1")}</span>
              <span className="relative mt-2 flex w-fit items-baseline">
                <span className="gradient-text-warm font-mono">{text}</span>
                <span className="terminal-caret text-primary" aria-hidden="true" />
                <svg
                  className="absolute -bottom-3 start-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8.5C50 3.5 100 2 150 5.5C200 9 250 9.5 298 7"
                    stroke="#F7941D"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="mt-2 block">{t("home.hero.title_part2")}</span>
            </h1>
          </Reveal>

          <Reveal from="left" distance={22} delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">
              {t("home.hero.description")}
            </p>
          </Reveal>

          <Reveal from="up" distance={20} delay={0.15}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" variant="primary" className="w-full sm:w-auto group">
                  {t("home.hero.cta_primary")}
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto border border-white/25 text-white hover:bg-white/10 hover:text-white"
                >
                  {t("home.hero.cta_secondary")}
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal from="up" distance={16} delay={0.2}>
            <div className="mt-10 flex items-center gap-4 text-white/45">
              <span className="h-px w-10 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.2em]">
                {t("home.hero.badge_secondary")}
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── Right: layered showcase ── */}
        <div className="lg:col-span-6">
          <Reveal
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg lg:ms-auto"
            delay={0.1}
            from="right"
            distance={26}
          >
            <div className="relative">
              <div className="hero-ring absolute -inset-4 rounded-[2.25rem] opacity-50 blur-2xl" aria-hidden="true" />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 shadow-2xl ring-1 ring-white/10">
                {HERO_IMAGES.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                      i === wordIndex ? "opacity-100 z-[2]" : "opacity-0 z-0"
                    }`}
                  />
                ))}
                <div
                  className="absolute inset-0 z-[3] bg-gradient-to-t from-[#060b1f]/85 via-[#060b1f]/10 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Floating card — live keyword */}
              <div className="hero-float absolute top-4 start-4 z-[4] rounded-2xl glass px-5 py-3.5 shadow-xl lg:-start-8">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-base font-semibold text-white sm:text-lg">
                    {text}
                    <span className="terminal-caret text-primary" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Floating card — trust checklist */}
              <div className="hero-float-delayed absolute bottom-4 end-4 z-[4] w-52 rounded-2xl glass p-4 shadow-xl lg:-end-8">
                <div className="flex flex-col gap-2.5">
                  {TRUST_KEYS.map((key) => (
                    <span key={key} className="flex items-center gap-2 text-xs text-white/85">
                      <HiCheckCircle className="shrink-0 text-primary" size={15} />
                      {t(`home.hero.trust.${key}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>

    {/* Scroll cue */}
    <div className="pointer-events-none absolute bottom-6 start-1/2 hidden -translate-x-1/2 rtl:translate-x-1/2 sm:flex">
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
        <span className="hero-scroll-dot h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
    </div>

    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
  );
};

const STAT_I18N_KEYS = {
  projects_delivered: "about.stats.projects_delivered",
  client_satisfaction: "about.stats.client_satisfaction",
  years_of_experience: "about.stats.years_of_experience",
  expert_engineers: "about.stats.expert_engineers",
};

const STAT_SYMBOLS = {
  projects_delivered: "+",
  client_satisfaction: "%",
  years_of_experience: "+",
  expert_engineers: "+",
};

const toTitleCase = (str) =>
  str
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const normalizeStats = (stats, translate) => {
  if (!stats) return [];
  if (Array.isArray(stats)) return stats;
  if (typeof stats === "object") {
    return Object.entries(stats).map(([key, value]) => ({
      label: STAT_I18N_KEYS[key] ? translate(STAT_I18N_KEYS[key]) : toTitleCase(key),
      value,
      symbol: STAT_SYMBOLS[key] ?? "",
    }));
  }
  return [];
};

const parseStatNumber = (raw) => {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = Number.parseFloat(raw.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const AnimatedStatValue = ({ raw, symbol, delayMs = 0 }) => {
  const target = useMemo(() => parseStatNumber(raw), [raw]);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    let rafId = 0;
    let io;

    const run = () => {
      const duration = 1400;
      const startWall = performance.now() + delayMs;

      const tick = (now) => {
        if (now < startWall) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const elapsed = now - startWall;
        const p = Math.min(1, elapsed / duration);
        const eased = 1 - (1 - p) ** 3;
        setDisplay(Math.round(target * eased));
        if (p < 1) rafId = requestAnimationFrame(tick);
        else setDisplay(Math.round(target));
      };

      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        run();
        io.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    return () => {
      io?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, delayMs]);

  if (target === null) {
    return (
      <span ref={ref}>
        {raw} {symbol}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {display} {symbol}
    </span>
  );
};

const StatsSection = ({ data }) => {
  const { t } = useTranslation();
  const stats = normalizeStats(data, t);
  if (!stats.length) return null;

  return (
    <section className="py-14 bg-surface border-y border-gray-100">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal
              key={String(stat.label)}
              delay={0.05 * i}
              from={["up", "right", "left", "down"][i % 4]}
              distance={18}
            >
              <div className="text-center">
                <p className="text-4xl lg:text-5xl font-display font-extrabold text-primary leading-none mb-2 tabular-nums">
                  <AnimatedStatValue raw={stat.value} symbol={stat.symbol} delayMs={i * 90} />
                </p>
                <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

const ServicesPreview = ({ data, isLoading }) => {
  const { t } = useTranslation();
  const featured = (data || []).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <Reveal from="down" distance={24}>
          <SectionTitle
            tag={t("home.services.tag")}
            title={t("home.services.title")}
            subtitle={t("home.services.subtitle")}
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
              <Reveal
                key={`home-service-skeleton-${index}`}
                delay={0.05 * index}
                from={["left", "up", "right"][index % 3]}
                distance={22}
              >
                <ServiceCardSkeleton />
              </Reveal>
            ))
            : featured.map((service, i) => (
              <Reveal
                key={service.id}
                delay={0.07 * i}
                from={["left", "right", "up"][i % 3]}
                distance={24}
              >
                <ServiceCard service={service} index={i} showLearnMore />
              </Reveal>
            ))}
        </div>

        <Reveal delay={0.12} className="mt-12 text-center" from="up" distance={20}>
          <Link to="/services">
            <Button variant="outline" size="md" className="group">
              {t("home.services.cta")}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180" />
            </Button>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};

const CtaBanner = () => {
  const { t } = useTranslation();
  return (
  <section className="py-20 bg-brand-gradient relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-2xl" />
    </div>
    <Container className="relative z-10 text-center">
      <Reveal from="up" distance={32}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-5">
          {t("home.cta.title")}
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          {t("home.cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button size="lg" variant="primary" className="shadow-glow">
              {t("home.cta.primary")}
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="lg"
              variant="ghost"
              className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              {t("home.cta.secondary")}
            </Button>
          </Link>
        </div>
      </Reveal>
    </Container>
  </section>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["home", i18n.language],
    queryFn: () =>
      axios.get(`${API_URL}/home`, {
        params: { locale: i18n.language },
      }),
  });

  useEffect(() => {
    if (error) {
      toast.error(error?.message || t("common.error"));
    }
  }, [error, t]);

  const partners = data?.data?.data?.partners;
  const partnerList = Array.isArray(partners) ? partners : [];

  return (
    <>
      <Hero />
      <StatsSection data={data?.data?.data?.stats} />
      <HomeAboutStrip />
      <HomeWhyUs />
      <Reveal from="left" distance={30}>
        <PartnersLogoMarquee partners={partnerList} />
      </Reveal>
      <HomeFulfillment />
      <ServicesPreview data={data?.data?.data?.services} isLoading={isLoading} />
      <HomeProcess />
      <HomePillars />
      <HomeTestimonials />
      <CtaBanner />
    </>
  );
};

export default Home;
