import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import { MdRocketLaunch, MdVisibility, MdHandshake } from "react-icons/md";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { STATS, TEAM } from "../constants/site";

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

/* ─── Values ─────────────────────────────────────────────────────────────── */
const values = [
  {
    icon: MdRocketLaunch,
    title: "Innovation First",
    description:
      "We constantly explore emerging technologies to give our clients a competitive edge — never settling for the status quo.",
    color: "primary",
  },
  {
    icon: MdVisibility,
    title: "Radical Transparency",
    description:
      "Clear communication, honest timelines, and zero surprises. You'll always know exactly where your project stands.",
    color: "secondary",
  },
  {
    icon: MdHandshake,
    title: "Client Partnership",
    description:
      "We embed ourselves as an extension of your team — fully invested in your outcomes, not just deliverables.",
    color: "primary",
  },
];

const perks = [
  "12+ years of industry experience",
  "Team of 40+ certified engineers",
  "Offices in 3 countries",
  "ISO 27001 & SOC 2 certified",
  "Agile & DevOps-first delivery",
  "Dedicated account managers",
];

const About = () => (
  <>
    <PageHero
      breadcrumb="About Us"
      title="Who We Are"
      subtitle="A team of technologists, strategists, and builders passionate about solving complex problems with elegant solutions."
    />

    {/* Story section */}
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <SectionTitle
              tag="Our Story"
              title="Built on Trust, Driven by Results"
              subtitle="Founded in 2012, Innovation Tech started as a small consultancy with a big ambition — to make enterprise-grade technology accessible to every business."
              align="left"
              className="mb-8"
            />
            <p className="text-text-secondary leading-relaxed mb-6">
              Over the past decade, we've grown into a full-service technology partner serving clients across finance, healthcare, retail, and logistics. Our approach combines deep technical expertise with genuine business acumen — we don't just build systems, we solve problems.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-text-secondary">
                  <HiCheckCircle className="text-primary shrink-0" size={18} />
                  {perk}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant="primary" size="md" className="group">
                Work With Us
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right — visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-brand-gradient p-1 shadow-card">
              <div className="w-full h-full rounded-[22px] bg-secondary-dark/50 backdrop-blur flex items-center justify-center">
                <div className="text-center p-10">
                  <p className="text-6xl font-display font-extrabold text-primary mb-2">12+</p>
                  <p className="text-white text-xl font-semibold mb-6">Years of Excellence</p>
                  <div className="grid grid-cols-2 gap-4">
                    {STATS.map((s) => (
                      <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-2xl font-display font-bold text-primary">{s.value}</p>
                        <p className="text-white/60 text-xs mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-surface rounded-2xl px-5 py-4 shadow-xl border border-gray-100 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm">
                #1
              </span>
              <div>
                <p className="text-text-primary text-sm font-bold leading-none">Top IT Firm</p>
                <p className="text-text-secondary text-xs mt-0.5">Clutch 2024</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    {/* Values */}
    <section className="py-20 bg-surface border-y border-gray-100">
      <Container>
        <SectionTitle
          tag="Our Values"
          title="The Principles We Live By"
          subtitle="These aren't just words on a wall — they define every decision, every line of code, and every client interaction."
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title} className="text-center flex flex-col items-center gap-4">
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
            );
          })}
        </div>
      </Container>
    </section>

    {/* Team */}
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <SectionTitle
          tag="Our Team"
          title="The People Behind the Work"
          subtitle="World-class engineers, designers, and strategists united by a passion for building things that matter."
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <Card key={member.name} className="text-center flex flex-col items-center gap-4">
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-display font-bold shadow-md ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-primary to-primary-dark"
                    : "bg-gradient-to-br from-secondary to-secondary-dark"
                }`}
              >
                {member.initials}
              </div>
              <div>
                <p className="font-display font-bold text-text-primary">{member.name}</p>
                <p className="text-text-secondary text-sm mt-0.5">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  </>
);

export default About;
