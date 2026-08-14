import { steps } from "@/data/process.json";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessPath from "./ProcessPath";

export default function OurProcess() {
  return (
    <section id="process" className="relative w-full overflow-hidden bg-bg pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow="How We Work" title="Our Process" align="center" />
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            A connected journey from first conversation to long-term growth — every step builds on the last.
          </p>
        </div>

        <div className="mt-24 sm:mt-28 lg:mt-32">
          <ProcessPath steps={steps} />
        </div>
      </div>
    </section>
  );
}
