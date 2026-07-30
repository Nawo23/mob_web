import Reveal from "@/components/ui/Reveal";

export default function ContactMap() {
  return (
    <section className="pb-4 lg:pb-6">
      <div className="container-mc">
        <Reveal direction="up">
          <div className="relative rounded-3xl overflow-hidden border border-mc-gray-200 aspect-[16/7]">
            <iframe
              title="MetaCraze HQ location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8644212038967!2d80.37057899999999!3d7.480220000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33b00462e57fd%3A0x9f0eb3e989a34568!2sMinistry%20of%20Brands!5e0!3m2!1sen!2slk!4v1785231962190!5m2!1sen!2slk"
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