/* ─── Site-wide constants ──────────────────────────────────────────────────── */
export const API_URL = 'https://api.xeron.tech/api/public'
export const BASE_URL = 'https://api.xeron.tech'

export const SITE_NAME = {
  first: "Innovation",
  second: " Tech",
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export const CONTACT_INFO = {
  address: "123 Innovation Drive, Tech City, CA 94016",
  phone: "+1 (555) 123-4567",
  email: "hello@innovationtech.com",
};

export const SERVICES = [
  {
    id: 1,
    icon: "MdCloudDone",
    title: "Cloud Solutions",
    description: "Scalable, secure cloud infrastructure tailored to your business needs — from migration to full cloud-native architecture.",
    tags: ["AWS", "Azure", "GCP"],
  },
  {
    id: 2,
    icon: "MdSecurity",
    title: "Cybersecurity",
    description: "Protect your assets with enterprise-grade security audits, threat detection, and 24/7 monitoring services.",
    tags: ["SOC 2", "ISO 27001", "Zero Trust"],
  },
  {
    id: 3,
    icon: "MdAutoGraph",
    title: "AI & Analytics",
    description: "Transform raw data into actionable insights with our machine learning models and business intelligence dashboards.",
    tags: ["ML", "BI", "Data Pipelines"],
  },
  {
    id: 4,
    icon: "MdDevices",
    title: "Web & Mobile Dev",
    description: "High-performance, pixel-perfect web and mobile applications built with modern stacks and best practices.",
    tags: ["React", "React Native", "Node.js"],
  },
  {
    id: 5,
    icon: "MdIntegrationInstructions",
    title: "API & Integrations",
    description: "Seamlessly connect your existing tools and platforms with custom API development and third-party integrations.",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
  {
    id: 6,
    icon: "MdSupportAgent",
    title: "Managed IT Support",
    description: "Reliable, responsive IT support and managed services to keep your systems running at peak performance.",
    tags: ["24/7", "SLA-backed", "Remote & On-site"],
  },
];

export const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years of Experience" },
  { value: "40+", label: "Expert Engineers" },
];

export const TEAM = [
  { name: "Alexandra Hart", role: "CEO & Co-Founder", initials: "AH" },
  { name: "Marcus Chen", role: "CTO & Lead Architect", initials: "MC" },
  { name: "Priya Sharma", role: "Head of Cybersecurity", initials: "PS" },
  { name: "Daniel Osei", role: "Lead AI Engineer", initials: "DO" },
];
