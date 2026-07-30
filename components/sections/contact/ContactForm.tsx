"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/app/contact/actions";

const BUDGETS = ["55,000LKR", "75,000LKR", "96,000LKR"];

// ⚠️ EDIT THIS: your WhatsApp number, with country code, no + or spaces
const WHATSAPP_NUMBER = "94712492183";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [budget, setBudget] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save to database
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        budget,
        message: form.message,
      });

      // 2. Open WhatsApp with prefilled message
      let text = `New Contact Form Submission%0A%0A`;
      text += `*Name:* ${encodeURIComponent(form.name)}%0A`;
      text += `*Email:* ${encodeURIComponent(form.email)}%0A`;
      if (form.company.trim()) text += `*Company:* ${encodeURIComponent(form.company)}%0A`;
      if (form.phone.trim()) text += `*Phone:* ${encodeURIComponent(form.phone)}%0A`;
      if (budget) text += `*Budget:* ${encodeURIComponent(budget)}%0A`;
      text += `*Message:* ${encodeURIComponent(form.message)}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      window.open(url, "_blank");

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="pb-8 lg:pb-12 ">
        <div className="container-mc">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3)] p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mc-red/10"
            >
              <CheckCircle2 className="h-8 w-8 text-mc-red" />
            </motion.div>
            <h3 className="font-display text-2xl font-semibold mb-3">Message sent</h3>
            <p className="text-mc-gray-600">We&apos;ll be in touch within one business day.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-8 lg:pb-12">
      <div className="container-mc">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3)] p-7 sm:p-9 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Field
              label="Full name"
              name="name"
              placeholder="Jane Cooper"
              required
              value={form.name}
              onChange={handleChange}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="jane@company.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Field
              label="Company"
              name="company"
              placeholder="Your company"
              value={form.company}
              onChange={handleChange}
            />
            <Field
              label="Phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-mc-ink mb-2">Monthly budget</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <BudgetPill
                  key={b}
                  label={b}
                  selected={budget === b}
                  onClick={() => setBudget((prev) => (prev === b ? "" : b))}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-mc-ink mb-2" htmlFor="message">
              Tell us about your goals
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={8}
              placeholder="What are you looking to grow, and by when?"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-2xl bg-white shadow-[0_8px_25px_-6px_rgba(0,0,0,0.2)] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-mc-red/30 transition-shadow resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-mc-red px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Message"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-mc-ink mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl bg-white shadow-[0_8px_25px_-6px_rgba(0,0,0,0.2)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-mc-red/30 transition-shadow"
      />
    </div>
  );
}

function BudgetPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium shadow-[0_6px_18px_-4px_rgba(0,0,0,0.25)] transition-all ${selected ? "bg-mc-red text-white" : "bg-white text-mc-gray-600 hover:text-mc-red hover:shadow-[0_8px_20px_-4px_rgba(229,9,20,0.35)]"
        }`}
    >
      {label}
    </button>
  );
}