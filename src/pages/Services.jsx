import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { ServiceCard, ServiceCardSkeleton } from "../components/ui/ServiceCard";
import { API_URL } from "../constants/site";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const PageHero = () => {
  const { t } = useTranslation();
  return (
    <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-light/10 blur-3xl" />
      </div>
      <Container className="relative z-10 text-center">
        <Reveal from="down" distance={28}>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            {t("services.hero.tag")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-5">
            {t("services.hero.title")}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("services.hero.description")}
          </p>
        </Reveal>
      </Container>
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

const CorePillars = () => {
  const { t, i18n } = useTranslation();
  const pillars = t("services.profile_pillars.items", { returnObjects: true });

  return (
    <section className="py-20 bg-surface border-y border-gray-100">
      <Container>
        <Reveal from="left" distance={22}>
          <SectionTitle
            tag={t("services.profile_pillars.tag")}
            title={t("services.profile_pillars.title")}
            subtitle={t("services.profile_pillars.subtitle")}
            className="mb-12"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {(Array.isArray(pillars) ? pillars : []).map((pillar, i) => (
            <Reveal key={`${pillar.title}-${i18n.language}`} from={i % 2 === 0 ? "right" : "left"} delay={0.06 * i} distance={24}>
              <Card className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-display font-bold text-text-primary">{pillar.title}</h3>
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {pillar.tag}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

const PROCESS_NUMS = ["01", "02", "03", "04"];

const Process = () => {
  const { t, i18n } = useTranslation();
  const steps = useMemo(
    () =>
      [1, 2, 3, 4].map((n) => ({
        num: PROCESS_NUMS[n - 1],
        title: t(`services.process.step${n}.title`),
        desc: t(`services.process.step${n}.desc`),
      })),
    [t, i18n.language]
  );

  return (
    <section className="py-20 bg-surface border-y border-gray-100">
      <Container>
        <Reveal from="up" distance={22}>
          <SectionTitle
            tag={t("services.process.tag")}
            title={t("services.process.title")}
            subtitle={t("services.process.subtitle")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.num} from={["left", "up", "right", "down"][i % 4]} delay={0.05 * i} distance={20}>
              <div className="relative flex flex-col gap-4">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                )}
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <span className="text-secondary font-display font-extrabold text-lg">{step.num}</span>
                </div>
                <h4 className="font-display font-bold text-text-primary text-lg">{step.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

const WHY_POINT_KEYS = ["point1", "point2", "point3", "point4", "point5", "point6"];

const WhyUs = () => {
  const { t, i18n } = useTranslation();
  const stats = useMemo(
    () => [
      { label: t("services.why.roi"), value: "340%", sub: t("services.why.roi_sub") },
      { label: t("services.why.delivery"), value: "96%", sub: t("services.why.delivery_sub") },
      { label: t("services.why.retention"), value: "89%", sub: t("services.why.retention_sub") },
    ],
    [t, i18n.language]
  );

  return (
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal from="left" distance={28}>
            <SectionTitle
              tag={t("services.why.tag")}
              title={t("services.why.title")}
              subtitle={t("services.why.subtitle")}
              align="left"
              className="mb-8"
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {WHY_POINT_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-text-secondary">
                  <HiCheckCircle className="text-primary shrink-0" size={18} />
                  {t(`services.why.${key}`)}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant="primary" size="md" className="group">
                {t("services.why.cta")}
                <HiArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Button>
            </Link>
          </Reveal>

          <Reveal from="right" distance={28} delay={0.08}>
            <div className="flex flex-col gap-4">
              {stats.map((item, i) => (
                <Card
                  key={item.label}
                  className={`flex items-center gap-6 ${i === 1 ? "ms-6" : i === 2 ? "ms-3" : ""}`}
                  hover={false}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-display font-extrabold text-primary">{item.value}</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary">{item.label}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{item.sub}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

const Services = () => {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["services", i18n.language],
    queryFn: () =>
      axios.get(`${API_URL}/services`, {
        params: { locale: i18n.language },
      }),
  });

  const services = Array.isArray(data?.data?.data) ? data.data.data : [];

  useEffect(() => {
    if (error) {
      toast.error(error?.message || t("common.error"));
    }
  }, [error, t]);

  return (
    <>
      <PageHero />

      <section className="py-20 lg:py-28 bg-background">
        <Container>
          <Reveal from="down" distance={24}>
            <SectionTitle
              tag={t("services.grid.tag")}
              title={t("services.grid.title")}
              subtitle={t("services.grid.subtitle")}
              className="mb-14"
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Reveal
                    key={`service-skeleton-${index}`}
                    delay={0.04 * index}
                    from={["left", "up", "right"][index % 3]}
                    distance={22}
                  >
                    <ServiceCardSkeleton />
                  </Reveal>
                ))
              : services.map((service, i) => (
                  <Reveal
                    key={service.id}
                    delay={0.05 * i}
                    from={["up", "left", "right", "down"][i % 4]}
                    distance={24}
                  >
                    <ServiceCard service={service} index={i} />
                  </Reveal>
                ))}
          </div>
        </Container>
      </section>

      <CorePillars />
      <Process />
      <WhyUs />
    </>
  );
};

export default Services;
