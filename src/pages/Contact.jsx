import { useState } from "react";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { API_URL, CONTACT_INFO } from "../constants/site";

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

const ContactForm = () => {
  const { t } = useTranslation();
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
      subject: form.subject.trim() || t("contact.form.subject_default"),
      message: form.message.trim(),
    };

    toast.promise(mutateAsync(payload), {
      loading: t("contact.form.sending"),
      success: (res) => {
        setSubmitted(true);
        return (
          res?.data?.message ||
          res?.data?.data?.message ||
          t("contact.form.success_toast")
        );
      },
      error: (err) =>
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        err?.message ||
        t("contact.form.error_toast"),
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <HiCheckCircle className="text-primary" size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold text-text-primary">{t("contact.form.sent_title")}</h3>
        <p className="text-text-secondary max-w-xs text-sm">
          {t("contact.form.sent_desc")}
        </p>
        <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
          {t("contact.form.send_another")}
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-background text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {t("contact.form.name_label")} <span className="text-primary">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {t("contact.form.email_label")} <span className="text-primary">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {t("contact.form.subject_label")}
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          autoComplete="off"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {t("contact.form.message_label")} <span className="text-primary">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          autoComplete="off"
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
            {t("contact.form.sending_btn")}
          </>
        ) : (
          <>
            {t("contact.form.submit")}
            <MdSend className="group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180 rtl:group-hover:-translate-x-1" size={18} />
          </>
        )}
      </Button>
    </form>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary-light/10 blur-3xl" />
        </div>
        <Container className="relative z-10 text-center">
          <Reveal from="down" distance={26}>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              {t("contact.hero.eyebrow")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-5">
              {t("contact.hero.title")}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              {t("contact.hero.description")}
            </p>
          </Reveal>
        </Container>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <Reveal from="left" distance={28} className="lg:col-span-2 flex flex-col gap-10">
              <SectionTitle
                tag={t("contact.info.tag")}
                title={t("contact.info.title")}
                subtitle={t("contact.info.subtitle")}
                align="left"
              />

              <Card hover={false} className="flex flex-col gap-6">
                <InfoItem
                  icon={HiMail}
                  label={t("contact.info.email_label")}
                  value={CONTACT_INFO.email}
                  href={`mailto:${CONTACT_INFO.email}`}
                />
                <InfoItem
                  icon={HiPhone}
                  label={t("contact.info.phone_label")}
                  value={CONTACT_INFO.phone}
                  href={CONTACT_INFO.phoneTel ? `tel:${CONTACT_INFO.phoneTel}` : undefined}
                />
                <InfoItem
                  icon={HiLocationMarker}
                  label={t("contact.info.office_label")}
                  value={CONTACT_INFO.address}
                />
              </Card>
            </Reveal>

            <Reveal from="right" distance={28} delay={0.06} className="lg:col-span-3">
              <Card hover={false} className="h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                    {t("contact.form.title")}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {t("contact.form.subtitle")}
                  </p>
                </div>
                <ContactForm />
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
