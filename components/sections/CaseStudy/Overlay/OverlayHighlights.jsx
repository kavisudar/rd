import { Award, Sparkles, TrendingUp, Users } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";

const ICONS = [TrendingUp, Users, Sparkles, Award];

export default function OverlayHighlights({ caseStudy }) {
  const results = caseStudy.results ?? [];
  if (results.length === 0) return null;

  return (
    <section className="px-5 sm:px-6 lg:px-10 xl:px-12">
      <FadeIn
        direction="up"
        duration={0.5}
        className="glass grid grid-cols-2 divide-y divide-border overflow-hidden rounded-2xl sm:grid-cols-4 sm:divide-y-0 sm:divide-x"
      >
        {results.map((result, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div key={result.label} className="flex min-w-0 items-center gap-3 p-4 sm:flex-col sm:items-start sm:gap-2 sm:p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <div className="flex w-full min-w-0 flex-col">
                <Counter
                  value={result.value}
                  prefix={result.prefix}
                  suffix={result.suffix}
                  className="font-display text-xl text-ink sm:text-2xl"
                />
                <span className="truncate text-[11px] text-text-secondary sm:text-xs">{result.label}</span>
              </div>
            </div>
          );
        })}
      </FadeIn>
    </section>
  );
}
