import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaPinterestP, FaFacebookF } from "react-icons/fa";
import company from "@/data/company.json";

const SOCIAL_ICONS = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  Pinterest: FaPinterestP,
  Facebook: FaFacebookF,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-bg-secondary text-ink">
      <div className="relative mx-auto flex max-w-[1600px] flex-col px-6 pt-20 pb-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-border pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg glass">
                <Image src="/assets/images/rd-logo.png" alt="" fill sizes="40px" className="object-contain p-1" />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.2em]">{company.shortName}</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">{company.description}</p>
            <div className="flex items-center gap-3">
              {company.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-300 ease-luxury hover:border-gold hover:text-gold"
                  >
                    {Icon && <Icon size={14} />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Explore</span>
            <nav className="flex flex-col gap-3">
              {company.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors duration-300 ease-luxury hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Contact</span>
            <div className="flex flex-col gap-3 text-sm text-text-secondary">
              <a href={`mailto:${company.email}`} className="transition-colors duration-300 ease-luxury hover:text-gold">
                {company.email}
              </a>
              <a href={`tel:${company.phone}`} className="transition-colors duration-300 ease-luxury hover:text-gold">
                {company.phone}
              </a>
              <p className="max-w-[220px] text-text-muted">{company.address}</p>
              <p className="text-text-muted">{company.hours}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>Crafted by the Raga Designers Studio</p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden leading-none"
      >
        <span className="block translate-y-[22%] whitespace-nowrap text-center font-display text-[16vw] font-medium tracking-tight text-gold/[0.06]">
          RAGA DESIGNERS
        </span>
      </div>
    </footer>
  );
}
