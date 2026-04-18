import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import {
  MdLightbulb,
  MdHandshake,
  MdVerifiedUser,
  MdBalance,
  MdFavorite,
  MdStar,
  MdGroups,
} from "react-icons/md";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { API_URL, BASE_URL } from "../constants/site";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const apiOrigin = () => {
  try {
    return new URL(API_URL).origin;
  } catch {
    return "";
  }
};

const resolveImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${apiOrigin()}${path.startsWith("/") ? "" : "/"}${path}`;
};

const initialsFromName = (name) => {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

/* ─── Page Hero ──────────────────────────────────────────────────────────── */
const PageHero = ({ breadcrumb, title, subtitle }) => (
  <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-light/10 blur-3xl" />
    </div>
    <Container className="relative z-10 text-center">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
        {breadcrumb}
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-5">
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </Container>
    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
  </section>
);

const VALUE_ICONS = [
  MdLightbulb,
  MdHandshake,
  MdVerifiedUser,
  MdBalance,
  MdFavorite,
  MdStar,
  MdGroups,
];

const StorySkeleton = () => (
  <section className="py-20 lg:py-28 bg-background animate-pulse">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-10 w-3/4 rounded-lg bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
        </div>
        <div className="aspect-square rounded-3xl bg-gray-200" />
      </div>
    </Container>
  </section>
);

const About = () => {
  const { t, i18n } = useTranslation();

  const valueCards = useMemo(() => {
    const items = t("about.values.items", { returnObjects: true });
    if (!Array.isArray(items)) return [];
    return items.map((item, i) => ({
      ...item,
      icon: VALUE_ICONS[i],
      color: i % 2 === 0 ? "primary" : "secondary",
    }));
  }, [t, i18n.language]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["about", i18n.language],
    queryFn: () =>
      axios.get(`${API_URL}/about`, {
        params: { locale: i18n.language },
      }),
  });

  const payload = data?.data?.data;
  const storyRoot = payload?.story;
  const storyBlock = storyRoot?.story;

  const heroTitle = storyBlock?.title || t("about.hero_title_fallback");
  const heroSubtitle =
    storyRoot?.our_mission ||
    storyBlock?.subtitle ||
    t("about.hero_subtitle_fallback");

  const descriptionParagraphs = storyBlock?.description
    ? String(storyBlock.description).split(/\n\n+/).filter(Boolean)
    : [];

  const bullets = Array.isArray(storyBlock?.bullets) ? storyBlock.bullets : [];

  const statTiles = storyRoot
    ? [
        { value: `${storyRoot.projects ?? 0}+`, label: t("about.stats.projects_delivered") },
        { value: `${storyRoot.clients ?? 0}%`, label: t("about.stats.client_satisfaction") },
        { value: `${storyRoot.years ?? 0}+`, label: t("about.stats.years_of_experience") },
        { value: `${storyRoot.engineers ?? 0}+`, label: t("about.stats.expert_engineers") },
      ]
    : [];

  const team = Array.isArray(payload?.team) ? payload.team : [];

  useEffect(() => {
    if (error) {
      toast.error(error?.message || t("common.error"));
    }
  }, [error, t]);

  return (
    <>
      <PageHero breadcrumb={t("about.breadcrumb")} title={heroTitle} subtitle={heroSubtitle} />

      {isLoading ? (
        <StorySkeleton />
      ) : (
        <>
          {/* Mission & Vision */}
          {(storyRoot?.our_mission || storyRoot?.our_vision) && (
            <section className="py-12 bg-background border-b border-gray-100">
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {storyRoot?.our_mission && (
                    <Reveal from="left" distance={24}>
                      <Card hover={false} className="h-full">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                          {t("about.mission.label")}
                        </p>
                        <p className="text-text-secondary leading-relaxed">{storyRoot.our_mission}</p>
                      </Card>
                    </Reveal>
                  )}
                  {storyRoot?.our_vision && (
                    <Reveal from="right" distance={24} delay={0.06}>
                      <Card hover={false} className="h-full">
                        <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                          {t("about.vision.label")}
                        </p>
                        <p className="text-text-secondary leading-relaxed">{storyRoot.our_vision}</p>
                      </Card>
                    </Reveal>
                  )}
                </div>
              </Container>
            </section>
          )}

          {/* Story section */}
          <section className="py-20 lg:py-28 bg-background">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                <Reveal from="left" distance={28}>
                  <SectionTitle
                    tag={storyBlock?.title || t("about.story.tag_fallback")}
                    title={storyBlock?.subtitle || t("about.story.title_fallback")}
                    align="left"
                    className="mb-8"
                  />
                  {descriptionParagraphs.map((para, idx) => (
                    <p key={idx} className="text-text-secondary leading-relaxed mb-6 last:mb-0">
                      {para}
                    </p>
                  ))}
                  {bullets.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {bullets.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-sm text-text-secondary">
                          <HiCheckCircle className="text-primary shrink-0" size={18} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link to="/contact">
                    <Button variant="primary" size="md" className="group">
                      {t("about.story.cta")}
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </Button>
                  </Link>
                </Reveal>

                <Reveal from="right" distance={28} delay={0.06} className="relative">
                  {storyRoot?.image || storyRoot?.portfolio ? (
                    <div className="rounded-3xl overflow-hidden shadow-card border border-gray-100">
                      <img
                        src={resolveImageUrl(storyRoot.image || storyRoot.portfolio)}
                        alt=""
                        className="w-full h-full object-cover aspect-square"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-3xl bg-brand-gradient p-1 shadow-card">
                      <div className="w-full h-full rounded-[22px] bg-secondary-dark/50 backdrop-blur flex items-center justify-center">
                        <div className="text-center p-10">
                          <p className="text-6xl font-display font-extrabold text-primary mb-2">
                            {storyRoot?.years ?? 12}+
                          </p>
                          <p className="text-white text-xl font-semibold mb-6">{t("about.stats.years_label")}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {statTiles.map((s) => (
                              <div
                                key={s.label}
                                className="bg-white/5 rounded-xl p-4 border border-white/10"
                              >
                                <p className="text-2xl font-display font-bold text-primary">{s.value}</p>
                                <p className="text-white/60 text-xs mt-1">{s.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute -bottom-5 -left-5 bg-surface rounded-2xl px-5 py-4 shadow-xl border border-gray-100 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm">
                      2012
                    </span>
                    <div>
                      <p className="text-text-primary text-sm font-bold leading-none">{t("about.clutch.title")}</p>
                      <p className="text-text-secondary text-xs mt-0.5">{t("about.clutch.label")}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        </>
      )}

      {/* Values */}
      <section className="py-20 bg-surface border-y border-gray-100">
        <Container>
          <Reveal from="down" distance={22}>
            <SectionTitle
              tag={t("about.values.tag")}
              title={t("about.values.title")}
              subtitle={t("about.values.subtitle")}
              className="mb-14"
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {valueCards.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal
                  key={`value-${i}-${i18n.language}`}
                  from={["up", "left", "right", "down"][i % 4]}
                  delay={0.05 * i}
                  distance={22}
                >
                  <Card className="text-center flex flex-col items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${
                        v.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
                      }`}
                    >
                      <Icon size={30} className={v.color === "primary" ? "text-primary" : "text-secondary"} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-text-primary">{v.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{v.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team section disabled until leadership profiles are published */}
      {!isLoading && team.length > 0 && (
        <section className="py-20 lg:py-28 bg-background">
          <Container>
            <Reveal from="up" distance={22}>
              <SectionTitle
                tag={t("about.team.tag")}
                title={t("about.team.title")}
                subtitle={t("about.team.subtitle")}
                className="mb-14"
              />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => {
                const imgUrl = resolveImageUrl(member.image);
                return (
                  <Reveal
                    key={member.id ?? member.name}
                    from={["left", "right", "up", "down"][i % 4]}
                    delay={0.06 * i}
                    distance={20}
                  >
                  <Card className="text-center flex flex-col items-center gap-4">
                    {imgUrl ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                        <img
                          src={BASE_URL + imgUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-display font-bold shadow-md ${
                          i % 2 === 0
                            ? "bg-gradient-to-br from-primary to-primary-dark"
                            : "bg-gradient-to-br from-secondary to-secondary-dark"
                        }`}
                      >
                        {initialsFromName(member.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-text-primary">{member.name}</p>
                      <p className="text-text-secondary text-sm mt-0.5">{member.title}</p>
                    </div>
                  </Card>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default About;
