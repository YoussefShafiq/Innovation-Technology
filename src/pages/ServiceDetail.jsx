import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
  MdStorage,
  MdPhone,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";
import { API_URL, SERVICES } from "../constants/site";

const ICONS = {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
  MdStorage,
  MdPhone,
};

const fetchServiceById = async (id, locale) => {
  const params = { locale };
  try {
    const res = await axios.get(`${API_URL}/services/${encodeURIComponent(id)}`, { params });
    const d = res.data?.data ?? res.data;
    if (d && (d.id != null || d.title)) return d;
  } catch {
    /* try list next */
  }
  try {
    const res = await axios.get(`${API_URL}/services`, { params });
    const list = Array.isArray(res.data?.data) ? res.data.data : [];
    const found = list.find((s) => String(s.id) === String(id));
    if (found) return found;
  } catch {
    /* fallback local */
  }
  return SERVICES.find((s) => String(s.id) === String(id)) || null;
};

const ServiceDetail = () => {
  const { t, i18n } = useTranslation();
  const { serviceId } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", serviceId, i18n.language],
    queryFn: () => fetchServiceById(serviceId, i18n.language),
    enabled: Boolean(serviceId),
  });

  const defaultHighlights = t("service_detail.default_highlights", { returnObjects: true });

  if (!isLoading && !service) {
    return (
      <section className="py-32 text-center">
        <Container>
          <h1 className="font-display text-2xl font-bold text-text-primary">{t("service_detail.not_found")}</h1>
          <Link to="/services" className="mt-6 inline-block text-primary font-semibold hover:underline">
            {t("service_detail.back")}
          </Link>
        </Container>
      </section>
    );
  }

  const Icon = ICONS[service?.icon] || MdCloudDone;
  const highlights = Array.isArray(service?.highlights)
    ? service.highlights
    : Array.isArray(service?.bullets)
      ? service.bullets
      : Array.isArray(defaultHighlights)
        ? defaultHighlights
        : [];

  const longText =
    service?.long_description ||
    service?.longDescription ||
    service?.description ||
    "";

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary-light/10 blur-3xl" />
        </div>
        <Container className="relative z-10">
          <Reveal from="down" distance={24}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("service_detail.breadcrumb")}</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                  {isLoading ? "…" : service?.title}
                </h1>
                {longText && (
                  <p className="mt-5 text-lg leading-relaxed text-white/75">{longText}</p>
                )}
              </div>
              {!isLoading && (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-primary shadow-lg backdrop-blur-sm">
                  <Icon size={34} />
                </div>
              )}
            </div>
          </Reveal>
        </Container>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="border-b border-gray-100 bg-background py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
            <Reveal from="left" distance={26} className="lg:col-span-2">
              <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">{t("service_detail.expect_title")}</h2>
              <ul className="flex flex-col gap-4">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <li key={i} className="h-12 animate-pulse rounded-xl bg-gray-100" />
                    ))
                  : highlights.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-surface px-4 py-3 text-sm text-text-secondary shadow-sm"
                      >
                        <HiCheckCircle className="mt-0.5 shrink-0 text-primary" size={20} />
                        {line}
                      </li>
                    ))}
              </ul>
            </Reveal>

            <Reveal from="right" distance={26}>
              <Card hover={false} className="h-full border-primary/15 bg-gradient-to-b from-primary/5 to-white">
                <h3 className="mb-3 font-display text-lg font-bold text-text-primary">{t("service_detail.tech_title")}</h3>
                <div className="mb-6 flex flex-wrap gap-2">
                  {(service?.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-text-secondary shadow-sm ring-1 ring-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-sm text-text-secondary leading-relaxed">
                  {t("service_detail.side_text")}
                </p>
                <Link to="/contact">
                  <Button variant="primary" size="md" className="group w-full sm:w-auto">
                    {t("service_detail.discuss")}
                    <HiArrowRight className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link
                  to="/services"
                  className="mt-4 block text-center text-sm font-semibold text-secondary hover:underline sm:text-start"
                >
                  {t("service_detail.all_services")}
                </Link>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ServiceDetail;
