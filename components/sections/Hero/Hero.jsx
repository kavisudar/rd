import { stats } from "@/data/stats.json";
import HeroVisual from "./HeroVisual";
import ScrollCue from "./ScrollCue";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";
import Button from "@/components/ui/Button";
import ContactCTA from "./ContactCTA";

const HERO_STATS = stats.slice(0, 3);

const HEADLINE_SEGMENTS = [
  { text: "From this room", className: "block text-ink" },
  { text: "to brands people remember.", className: "block text-brand-gold-shine", shine: true },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-svh w-full overflow-hidden bg-bg">
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-between px-6 pb-6 pt-20 sm:px-8 lg:px-12 lg:pb-6 lg:pt-24">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-10 xl:gap-x-16">
          <div className="flex flex-col gap-6 lg:col-span-6 lg:justify-center">
            <div className="flex flex-col gap-4">
              <FadeIn direction="none" duration={0.6}>
                <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
                  Chennai, India — Creative Digital Partner
                </span>
              </FadeIn>

              <RevealText
                as="h1"
                segments={HEADLINE_SEGMENTS}
                delay={0.15}
                stagger={0.05}
                inView={false}
                className="font-display text-4xl font-semibold uppercase leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl"
              />
            </div>

            <FadeIn delay={0.6} className="max-w-md text-lg font-medium leading-relaxed text-black sm:text-xl">
              <p>
                Our Chennai studio, 15 years in and a team that turns ideas into websites and brand
                systems that actually move the needle.
              </p>
            </FadeIn>

            <FadeIn delay={0.85}>
              <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
                <Button href="#portfolio" variant="solid">
                  Explore Our Work
                </Button>

                <div className="sm:border-l sm:border-border sm:pl-6">
                  <ContactCTA />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[20rem]">
              <HeroVisual />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-6 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between lg:mt-6">
          <ScrollCue />

          <div className="flex items-center gap-8">
            {HERO_STATS.map((stat, i) => (
              <FadeIn
                key={stat.id}
                delay={1.1 + i * 0.1}
                className="flex flex-col gap-1 border-l border-border pl-6 first:border-l-0 first:pl-0"
              >
                <span className="font-display text-3xl text-black sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[11px] uppercase tracking-widest text-black">{stat.label}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
