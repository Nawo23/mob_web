"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const BUDGETS = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-3xl bg-white shadow-[0_20px_60px_-12px_rgba(0,0,0,0.3)] p-7 sm:p-9 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-6">
  <Field label="Full name" name="name" placeholder="Jane Cooper" required />
  <Field label="Email address" name="email" type="email" placeholder="jane@company.com" required />
</div>
<div className="grid sm:grid-cols-2 gap-6">
  <Field label="Company" name="company" placeholder="Your company" />
  <Field label="Phone" name="phone" placeholder="+1 (555) 000-0000" />
</div>

          <div>
            <label className="block text-sm font-medium text-mc-ink mb-2">Monthly budget</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <BudgetPill key={b} label={b} />
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
  className="w-full rounded-2xl bg-white shadow-[0_8px_25px_-6px_rgba(0,0,0,0.2)] px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-mc-red/30 transition-shadow resize-none"
/>
          </div>

          <button
            type="submit"
            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-mc-red px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-95"
          >
            Send Message
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
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
        className="w-full rounded-2xl bg-white shadow-[0_8px_25px_-6px_rgba(0,0,0,0.2)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-mc-red/30 transition-shadow"
      />
    </div>
  );
}

function BudgetPill({ label }: { label: string }) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setSelected((v) => !v)}
      className={`rounded-full px-4 py-2 text-xs font-medium shadow-[0_6px_18px_-4px_rgba(0,0,0,0.25)] transition-all ${
        selected ? "bg-mc-red text-white" : "bg-white text-mc-gray-600 hover:text-mc-red hover:shadow-[0_8px_20px_-4px_rgba(229,9,20,0.35)]"
      }`}
    >
      {label}
    </button>
  );
}