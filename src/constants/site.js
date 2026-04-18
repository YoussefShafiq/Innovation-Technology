/* ─── Site-wide constants ──────────────────────────────────────────────────── */
const API_ORIGIN = (import.meta.env.VITE_API_URL ?? 'https://api.xeron.tech').replace(/\/$/, '')

export const API_URL = `${API_ORIGIN}/api/public`
export const BASE_URL = API_ORIGIN

export const SITE_NAME = {
  first: "Innovation",
  second: "Technology",
};

export const NAV_LINKS = [
  { label: "nav.home", path: "/" },
  { label: "nav.about", path: "/about" },
  { label: "nav.services", path: "/services" },
  { label: "nav.contact", path: "/contact" },
];

export const CONTACT_INFO = {
  address:
    "3 City Stars Towers, Central Axis (El Mehwar Elmarkazy), 2nd Floor, Office 20, 6th of October City, Giza, Egypt",
  phone: "+20 2 38244418 · +20 109 566 2005 · +20 103 375 9080",
  phoneTel: "+20238244418",
  email: "ahmed.gamal@in-technology.info",
};

/** Fallback cards when API list is unavailable — aligned with Innovation Technology service pillars */
export const SERVICES = [
  {
    id: 1,
    icon: "MdDevices",
    title: "End-user computing & hardware",
    description:
      "Desktops, notebooks, and thin clients matched to policy, performance, and lifecycle needs.",
    tags: ["Endpoints", "Procurement"],
  },
  {
    id: 2,
    icon: "MdCloudDone",
    title: "Cloud, Microsoft 365 & Azure",
    description:
      "Azure and Microsoft 365 adoption with hybrid-aware planning — without throwing away prior investments.",
    tags: ["Azure", "M365"],
  },
  {
    id: 3,
    icon: "MdSecurity",
    title: "Cyber security",
    description:
      "Layered defenses from perimeter to endpoint — firewalls, encryption, web filtering, IDS/IPS, and more.",
    tags: ["Defense in depth"],
  },
  {
    id: 4,
    icon: "MdStorage",
    title: "Data center & infrastructure",
    description:
      "Servers, storage, networking, virtualization, and power — designed for availability you can operate.",
    tags: ["DC", "Virtualization"],
  },
  {
    id: 5,
    icon: "MdPhone",
    title: "VoIP & unified communications",
    description:
      "Modern IP telephony with platform and handset choices sized to how your organization communicates.",
    tags: ["VoIP", "UC"],
  },
];

export const STATS = [
  { value: "340+", label: "Projects Delivered" },
  { value: "97%", label: "Client Satisfaction" },
  { value: "14+", label: "Years of Experience" },
  { value: "36+", label: "Expert Engineers" },
];
