import { Building2, CalendarRange, Globe2, Layers, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function ProjectSnapshot({ caseStudy }) {
  const { companyName, industry, year, services, website } = caseStudy;

  const stats = [
    { icon: Building2, label: "Client", value: companyName },
    { icon: Globe2, label: "Industry", value: industry },
    { icon: CalendarRange, label: "Year", value: year },
    { icon: Layers, label: "Services", value: `${services.length} Delivered` },
  ];

  return (
    <section className="relative w-full bg-bg pt-14 pb-12 sm:pt-16 sm:pb-14">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <FadeIn direction="up" duration={0.6}>
          <div className="glass grid grid-cols-2 divide-y divide-border overflow-hidden rounded-[28px] sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-2 p-6 sm:p-7">
                <Icon size={18} className="text-brand-gold" strokeWidth={1.75} />
                <span className="text-[11px] font-medium uppercase tracking-widest text-text-muted">{label}</span>
                <span className="truncate font-display text-lg text-ink">{value}</span>
              </div>
            ))}

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-2 flex flex-col justify-center gap-2 bg-gold p-6 text-white transition-colors duration-300 ease-luxury hover:bg-gold-light sm:col-span-1 sm:p-7"
              >
                <span className="text-[11px] font-medium uppercase tracking-widest text-white/70">Live Project</span>
                <span className="inline-flex items-center gap-2 font-display text-lg">
                  View Website
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 ease-luxury group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </span>
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
