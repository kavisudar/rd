import company from "@/data/company.json";
import { stats } from "@/data/stats.json";
import HeroScene from "@/components/three/HeroScene";
import ScrollCue from "./ScrollCue";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";
import Button from "@/components/ui/Button";
import ContactCTA from "./ContactCTA";

const HERO_STATS = stats.slice(0, 3);

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/10 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-bg/70 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-32 sm:px-8 lg:px-12">
        <div className="flex max-w-3xl flex-col gap-6">
          <FadeIn direction="none" duration={0.6}>
            <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
              Web Design · Development · Digital Marketing
            </span>
          </FadeIn>

          <RevealText
            as="h1"
            text={company.tagline}
            delay={0.15}
            stagger={0.05}
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-8xl"
          />

          <FadeIn delay={0.7} className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
            <p>{company.description}</p>
          </FadeIn>

          <FadeIn delay={0.9}>
            <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
              <Button href="#portfolio" variant="outline" className="text-ink">
                View Our Work
              </Button>

              <div className="sm:border-l sm:border-border sm:pl-6">
                <ContactCTA />
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
          <ScrollCue />

          <div className="flex items-center gap-8">
            {HERO_STATS.map((stat, i) => (
              <FadeIn
                key={stat.id}
                delay={1 + i * 0.1}
                className="flex flex-col gap-1 border-l border-border pl-6 first:border-l-0 first:pl-0"
              >
                <span className="font-display text-3xl text-gradient sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[11px] uppercase tracking-widest text-text-muted">{stat.label}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
