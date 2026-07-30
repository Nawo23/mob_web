import type { Metadata } from "next";
import prisma from "@/lib/db";
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

export default async function ContactPage() {
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: "main" } });

  return (
    <>
      <ContactHero />
      <ContactInfo info={contactInfo} />
      <ContactForm />
      <ContactMap />
      <FAQSection />
    </>
  );
}
