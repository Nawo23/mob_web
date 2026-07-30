import type { Metadata } from "next";
import { Outfit, Inter, Poppins } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import prisma from "@/lib/db";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MetaCraze — Social Media Marketing Agency",
    template: "%s | MetaCraze",
  },
  description:
    "MetaCraze is a premium social media marketing agency helping brands grow faster through strategy, content, paid media and creative that converts.",
  keywords: [
    "social media marketing agency",
    "digital marketing",
    "content creation",
    "paid media",
    "brand growth",
  ],
  openGraph: {
    title: "MetaCraze — Social Media Marketing Agency",
    description:
      "Grow faster with creative social media marketing built to convert. Strategy, content and performance media in one team.",
    siteName: "MetaCraze",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: "main" } });
  const whatsappNumber = contactInfo?.whatsappNumber || "94712492183"; // fallback

  return (
    <html lang="en">
      <body>
        <ConditionalLayout
          footer={<Footer />}
          whatsapp={<FloatingWhatsApp whatsappNumber={whatsappNumber} />}
        >
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}