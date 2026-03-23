import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import { ServiceCard, ServiceCardSkeleton } from "../components/ui/ServiceCard";
import { API_URL } from "../constants/site";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

/* ─── Hero Section ───────────────────────────────────────────────────────── */
const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
    {/* Decorative shapes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary-light/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/2 blur-[100px]" />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>

    <Container className="relative z-10 pt-28 pb-20">
      <div className="max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Trusted by 150+ companies worldwide
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-white leading-[1.08] mb-6">
          Technology That{" "}
          <span className="relative">
            <span className="text-primary">Powers</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
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
          </span>{" "}
          Your Business
        </h1>

        <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
          We deliver cutting-edge cloud, cybersecurity, AI, and software solutions
          that help forward-thinking businesses scale faster and operate smarter.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/services">
            <Button size="lg" variant="primary" className="w-full sm:w-auto group">
              Explore Services
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
          <Link to="/about">
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto border border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Learn About Us
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10">
          {["ISO Certified", "99.9% Uptime SLA", "24/7 Support"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
              <HiCheckCircle className="text-primary" size={16} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </Container>

    {/* Bottom fade */}
    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ─── Stats Strip ────────────────────────────────────────────────────────── */
const STAT_LABELS = {
  projects_delivered: {
    label: "Projects Delivered",
    symbol: '+',
  },
  client_satisfaction: {
    label: "Client Satisfaction",
    symbol: '%',
  },
  years_of_experience: {
    label: "Years of Experience",
    symbol: '+',
  },
  expert_engineers: {
    label: "Expert Engineers",
    symbol: '+',
  }
};

const toTitleCase = (str) =>
  str
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const normalizeStats = (stats) => {
  if (!stats) return [];
  if (Array.isArray(stats)) return stats;
  if (typeof stats === "object") {
    return Object.entries(stats).map(([key, value]) => ({
      label: STAT_LABELS[key].label || toTitleCase(key),
      value,
      symbol: STAT_LABELS[key].symbol,
    }));
  }
  return [];
};

const StatsSection = ({ data }) => {
  const stats = normalizeStats(data);

  return (
    <section className="py-14 bg-surface border-y border-gray-100">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-display font-extrabold text-primary leading-none mb-2">
                {stat.value} {stat.symbol}
              </p>
              <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ─── Services Preview ───────────────────────────────────────────────────── */
const ServicesPreview = ({ data, isLoading }) => {
  const featured = (data || []).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <SectionTitle
          tag="What We Do"
          title="Solutions Built for Scale"
          subtitle="From cloud infrastructure to AI-powered analytics — we cover every layer of your technology stack."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ServiceCardSkeleton key={`home-service-skeleton-${index}`} />
              ))
            : featured.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  showLearnMore={false}
                />
              ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="md" className="group">
              View All Services
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

/* ─── CTA Banner ─────────────────────────────────────────────────────────── */
const CtaBanner = () => (
  <section className="py-20 bg-brand-gradient relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-2xl" />
    </div>
    <Container className="relative z-10 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-5">
        Ready to Transform Your Business?
      </h2>
      <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
        Let's discuss your technology challenges and build the right solution together.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button size="lg" variant="primary" className="shadow-glow">
            Start a Project
          </Button>
        </Link>
        <Link to="/about">
          <Button
            size="lg"
            variant="ghost"
            className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            Meet the Team
          </Button>
        </Link>
      </div>
    </Container>
  </section>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */
const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['home'],
    queryFn: () => {
      return axios.get(`${API_URL}/home`)
    },
  })

  if (error) {
    toast.error(error?.message || 'Something went wrong');
  };

  return (
    <>
      <Hero />
      <StatsSection data={data?.data?.data?.stats} />
      <ServicesPreview data={data?.data?.data?.services} isLoading={isLoading} />
      <CtaBanner />
    </>
  );

};
export default Home;
