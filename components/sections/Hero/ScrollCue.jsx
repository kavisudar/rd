export default function ScrollCue() {
  return (
    <div className="flex items-center gap-3 text-ink/60">
      <span className="text-[11px] font-medium uppercase tracking-widest">Scroll</span>
      <span className="relative h-10 w-px overflow-hidden bg-ink/15" aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-1/2 w-px bg-gold animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
      </span>
    </div>
  );
}
