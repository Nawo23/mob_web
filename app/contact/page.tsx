import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactMap from "@/components/sections/contact/ContactMap";
import FAQSection from "@/components/sections/home/FAQSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MetaCraze to book a free consultation. Office address, phone, email and a direct contact form.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <FAQSection />
    </>
  );
}
