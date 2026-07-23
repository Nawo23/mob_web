import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { SOCIAL_ICONS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const INFO_ITEMS = [
  { icon: MapPin, label: "Office Address", value: "42 Marine Drive, Colombo 03, Sri Lanka" },
  { icon: Phone, label: "Phone", value: "+94 11 234 5678" },
  { icon: Mail, label: "Email", value: "hello@metacraze.agency" },
  { icon: Clock, label: "Working Hours", value: "Mon – Fri, 9:00 AM – 6:00 PM" },
];

export default function ContactInfo() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="container-mc">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INFO_ITEMS.map(({ icon: Icon, label, value }, i) => (
  <Reveal key={label} direction="up" delay={i * 0.08}>
    <div className="group h-full rounded-3xl bg-white shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] p-7 transition-all duration-300 hover:shadow-[0_20px_45px_-10px_rgba(229,9,20,0.25)] hover:-translate-y-1.5">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mc-red/15 to-mc-red/5 text-mc-red transition-colors duration-300 group-hover:bg-mc-red group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-xs font-medium tracking-wide uppercase text-mc-gray-400">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-mc-ink leading-snug">{value}</p>
    </div>
  </Reveal>
))}
        </div>

        
      </div>
    </section>
  );
}