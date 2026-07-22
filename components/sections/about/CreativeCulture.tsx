import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
    alt: "Creative team brainstorming session",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80",
    alt: "Content creator filming a product shoot",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80",
    alt: "Team meeting around a whiteboard",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
    alt: "MetaCraze office workspace",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80",
    alt: "Team collaborating on strategy documents",
    span: "",
  },
];

export default function CreativeCulture() {
  return (
    <section className="py-8 lg:py-12 bg-mc-gray-50">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Creative Culture"
          title="A studio built for people who love the work"
          description="Real photos from the space where strategy decks and reel scripts get written."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 auto-rows-[180px]">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} direction="scale" delay={i * 0.06} className={photo.span}>
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
