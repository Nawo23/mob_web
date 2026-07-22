"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-8 lg:py-12 bg-mc-gray-50 overflow-hidden">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          description="Straight from the founders and marketing leads we work with every week."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            className="!pb-4"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name} className="h-auto">
                <div className="h-full rounded-3xl bg-white border border-mc-gray-200 p-8 flex flex-col">
                  <Quote className="h-8 w-8 text-mc-red/30 mb-4" />
                  <p className="text-mc-ink leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-mc-red text-mc-red" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover h-11 w-11"
                    />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-mc-gray-600">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-pagination flex justify-center gap-2 mt-6" />
        </div>
      </div>
    </section>
  );
}
