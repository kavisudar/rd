import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";

export default function SectionHeading({ eyebrow, title, align = "left", className = "" }) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${className}`}>
      {eyebrow && (
        <FadeIn direction="none" duration={0.6}>
          <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">{eyebrow}</span>
        </FadeIn>
      )}
      <RevealText
        as="h2"
        text={title}
        className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
      />
    </div>
  );
}
