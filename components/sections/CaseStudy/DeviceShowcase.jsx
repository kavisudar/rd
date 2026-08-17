import Image from "next/image";
import VisualFallback from "./VisualFallback";

function Screen({ screenshot, logo, companyName, industry, compact, sizes }) {
  if (screenshot) {
    return (
      <Image
        src={screenshot}
        alt={`${companyName} website preview`}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }
  return <VisualFallback logo={logo} companyName={companyName} industry={industry} compact={compact} />;
}

export default function DeviceShowcase({ screenshot, logo, companyName, industry }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card to-bg-secondary/70 px-6 py-9 sm:rounded-[20px] sm:px-10 sm:py-11">
      <div className="relative w-[74%] max-w-sm">
        <div className="relative overflow-hidden rounded-t-md border-[3px] border-b-0 border-ink/85 bg-ink shadow-card">
          <span
            className="absolute left-1/2 top-0.5 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-white/40"
            aria-hidden="true"
          />
          <div className="relative aspect-video w-full">
            <Screen
              screenshot={screenshot}
              logo={logo}
              companyName={companyName}
              industry={industry}
              sizes="(min-width: 1024px) 32vw, 60vw"
            />
          </div>
        </div>
        <div className="h-2 w-full rounded-b-sm bg-ink/85 sm:h-2.5" />
        <div className="mx-auto h-1 w-1/4 rounded-b-md bg-ink/60" />
      </div>

      <div className="absolute bottom-3 right-3 w-[24%] max-w-[104px] sm:bottom-4 sm:right-6">
        <div className="relative overflow-hidden rounded-[18px] border-[3px] border-ink/85 bg-ink shadow-card">
          <span
            className="absolute left-1/2 top-1 z-10 h-0.5 w-3.5 -translate-x-1/2 rounded-full bg-white/30"
            aria-hidden="true"
          />
          <div className="relative aspect-[9/19] w-full">
            <Screen
              screenshot={screenshot}
              logo={logo}
              companyName={companyName}
              industry={industry}
              compact
              sizes="120px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
