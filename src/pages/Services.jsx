import { Link } from "react-router-dom";
import {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
} from "react-icons/md";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { SERVICES } from "../constants/site";

/* Icon lookup map */
const ICONS = {
  MdCloudDone,
  MdSecurity,
  MdAutoGraph,
  MdDevices,
  MdIntegrationInstructions,
  MdSupportAgent,
};

/* ─── Page Hero ──────────────────────────────────────────────────────────── */
const PageHero = () => (
  <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-light/10 blur-3xl" />
    </div>
    <Container className="relative z-10 text-center">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
        What We Offer
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-5">
        Our Services
      </h1>
      <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
        End-to-end technology services designed to accelerate your digital transformation
        and deliver measurable business outcomes.
      </p>
    </Container>
    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
  </section>
);

/* ─── Service card ───────────────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const Icon = ICONS[service.icon];
  const isEven = index % 2 === 0;

  return (
    <Card className="flex flex-col gap-5 h-full">
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
          isEven ? "bg-primary/10" : "bg-secondary/10"
        }`}
      >
        <Icon size={26} className={isEven ? "text-primary" : "text-secondary"} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-display font-bold text-text-primary mb-2">
          {service.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Learn more link */}
      <Link
        to="/contact"
        className={`flex items-center gap-1.5 text-sm font-semibold group ${
          isEven ? "text-primary" : "text-secondary"
        }`}
      >
        Learn More
        <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={15} />
      </Link>
    </Card>
  );
};

/* ─── Process Section ────────────────────────────────────────────────────── */
const steps = [
  { num: "01", title: "Discovery",   desc: "We deep-dive into your business goals, tech stack, and challenges to define a clear problem statement." },
  { num: "02", title: "Strategy",    desc: "Our architects design a tailored solution roadmap with clear milestones, timelines, and success metrics." },
  { num: "03", title: "Build",       desc: "Agile sprints, continuous integration, and regular demos keep you in the loop at every stage." },
  { num: "04", title: "Launch & Grow", desc: "We deploy, monitor, and support your solution — then help you scale as your business evolves." },
];

const Process = () => (
  <section className="py-20 bg-surface border-y border-gray-100">
    <Container>
      <SectionTitle
        tag="How We Work"
        title="Our Proven Process"
        subtitle="A structured, transparent approach that delivers on time, on budget, and beyond expectations."
        className="mb-14"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, i) => (
          <div key={step.num} className="relative flex flex-col gap-4">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-gray-200 to-transparent" />
            )}
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <span className="text-secondary font-display font-extrabold text-lg">{step.num}</span>
            </div>
            <h4 className="font-display font-bold text-text-primary text-lg">{step.title}</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

/* ─── Why Us ─────────────────────────────────────────────────────────────── */
const whyPoints = [
  "Dedicated project manager from day one",
  "Weekly progress reports & demos",
  "Source code ownership — always yours",
  "Post-launch support & maintenance",
  "Flexible engagement models",
  "NDA & data privacy guaranteed",
];

const WhyUs = () => (
  <section className="py-20 lg:py-28 bg-background">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionTitle
            tag="Why Choose Us"
            title="The Difference is in the Details"
            subtitle="We don't just deliver software — we become your technology partner for the long haul."
            align="left"
            className="mb-8"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {whyPoints.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-text-secondary">
                <HiCheckCircle className="text-primary shrink-0" size={18} />
                {p}
              </li>
            ))}
          </ul>
          <Link to="/contact">
            <Button variant="primary" size="md" className="group">
              Start a Conversation
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Right — decorative card stack */}
        <div className="flex flex-col gap-4">
          {[
            { label: "Average Project ROI", value: "340%", sub: "Based on 2023 client surveys" },
            { label: "On-time Delivery Rate", value: "96%",  sub: "Across all project types" },
            { label: "Client Retention Rate", value: "89%",  sub: "Clients return for more projects" },
          ].map((item, i) => (
            <Card
              key={item.label}
              className={`flex items-center gap-6 ${i === 1 ? "ml-6" : i === 2 ? "ml-3" : ""}`}
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
      </div>
    </Container>
  </section>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */
const Services = () => (
  <>
    <PageHero />

    {/* Services grid */}
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <SectionTitle
          tag="All Services"
          title="Everything You Need to Succeed"
          subtitle="Comprehensive technology services that cover the entire digital lifecycle of your business."
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>

    <Process />
    <WhyUs />
  </>
);

export default Services;
