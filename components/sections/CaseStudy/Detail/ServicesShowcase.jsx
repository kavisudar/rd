import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

export default function ServicesShowcase({ caseStudy }) {
  return (
    <section className="relative w-full bg-bg py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="What We Delivered" title="Services Provided" />

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-14">
          {caseStudy.services.map((service, index) => (
            <FadeIn key={service} direction="scale" delay={index * 0.04} duration={0.4}>
              <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm text-gold">
                {service}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
