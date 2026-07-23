import Reveal from "@/components/ui/Reveal";

export default function ContactMap() {
  return (
    <section className="pb-4 lg:pb-6">
      <div className="container-mc">
        <Reveal direction="up">
          <div className="relative rounded-3xl overflow-hidden border border-mc-gray-200 aspect-[16/7]">
            <iframe
              title="MetaCraze HQ location"
              src="https://www.google.com/maps?q=Marine+Drive,+Colombo+03,+Sri+Lanka&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}