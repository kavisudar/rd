export default function GoldDivider({ className = "" }) {
  return <div className={`h-px w-full bg-linear-to-r from-transparent via-gold/60 to-transparent ${className}`} />;
}
