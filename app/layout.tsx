import type { Metadata } from "next";
import { Outfit, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-mc-black">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
