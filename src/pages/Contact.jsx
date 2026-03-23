import { useState } from "react";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { API_URL, CONTACT_INFO } from "../constants/site";

/* ─── Contact info card ──────────────────────────────────────────────────── */
const InfoItem = ({ icon: Icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="text-primary" size={20} />
    </div>
    <div>
      <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-0.5">{label}</p>
      {href ? (
        <a href={href} className="text-text-primary font-semibold hover:text-primary transition-colors text-sm">
          {value}
        </a>
      ) : (
        <p className="text-text-primary font-semibold text-sm">{value}</p>
      )}
    </div>
  </div>
);

/* ─── Contact Form ───────────────────────────────────────────────────────── */
/* POST body matches Public → Contact Submit in innovation-tech.json */
const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body) =>
      axios.post(`${API_URL}/contact`, body, {
        headers: { "Content-Type": "application/json" },
      }),
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || "General Inquiry",
      message: form.message.trim(),
    };

    toast.promise(mutateAsync(payload), {
      loading: "Sending your message...",
      success: (res) => {
        setSubmitted(true);
        return (
          res?.data?.message ||
          res?.data?.data?.message ||
          "Thanks — we'll get back to you within 24 business hours."
        );
      },
      error: (err) =>
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        err?.message ||
        "Failed to send. Please try again.",
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <HiCheckCircle className="text-primary" size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold text-text-primary">Message Sent!</h3>
        <p className="text-text-secondary max-w-xs text-sm">
          Thank you for reaching out. We'll get back to you within 24 business hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
          Send Another
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-background text-text-primary text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@company.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Subject
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help you?"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell us about your project or challenge..."
          className={`${inputClass} resize-none`}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        className="w-full sm:w-auto self-start group"
      >
        {isPending ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <MdSend className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
          </>
        )}
      </Button>
    </form>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
const Contact = () => (
  <>
    {/* Hero */}
    <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-light/10 blur-3xl" />
      </div>
      <Container className="relative z-10 text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
          Get in Touch
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-5">
          Let's Talk
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
          Have a project in mind? A challenge to solve? Or just want to explore what's possible?
          We'd love to hear from you.
        </p>
      </Container>
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Main content */}
    <section className="py-20 lg:py-28 bg-background">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* Left — Info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <SectionTitle
              tag="Contact Info"
              title="We're Here to Help"
              subtitle="Reach out through any channel — our team typically responds within a few hours."
              align="left"
            />

            <Card hover={false} className="flex flex-col gap-6">
              <InfoItem
                icon={HiMail}
                label="Email"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
              />
              <InfoItem
                icon={HiPhone}
                label="Phone"
                value={CONTACT_INFO.phone}
                href={`tel:${CONTACT_INFO.phone}`}
              />
              <InfoItem
                icon={HiLocationMarker}
                label="Office"
                value={CONTACT_INFO.address}
              />
            </Card>

            {/* Hours card */}
            <Card hover={false} className="bg-secondary-dark border-secondary/20">
              <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
                Business Hours
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { day: "Monday – Friday",  hours: "9:00 AM – 6:00 PM EST" },
                  { day: "Saturday",         hours: "10:00 AM – 2:00 PM EST" },
                  { day: "Sunday",           hours: "Closed"                 },
                ].map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{h.day}</span>
                    <span className="text-white font-medium">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">Emergency support available 24/7</span>
              </div>
            </Card>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <Card hover={false} className="h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                  Send Us a Message
                </h3>
                <p className="text-text-secondary text-sm">
                  Fill out the form and we'll get back to you shortly.
                </p>
              </div>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Container>
    </section>
  </>
);

export default Contact;
