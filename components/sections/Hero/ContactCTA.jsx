import { Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import company from "@/data/company.json";

const instagramUrl = company.socials.find((s) => s.platform === "Instagram")?.url;

const CONTACT_LINKS = [
  {
    key: "whatsapp",
    href: `https://wa.me/${9962743888}`,
    ariaLabel: "Contact us on WhatsApp",
    tooltip: "Chat on WhatsApp",
    Icon: FaWhatsapp,
    restClassName: "text-[#25D366]",
    iconMotionClassName: "motion-safe:animate-[whatsapp-breathe_2.6s_ease-in-out_infinite] group-hover:animate-none",
    hoverClassName:
      "hover:border-[#25D366]/60 hover:bg-[linear-gradient(135deg,#25D366,#128C7E)] hover:text-white hover:shadow-[0_12px_30px_rgba(37,211,102,0.45)] focus-visible:border-[#25D366]/60 focus-visible:bg-[linear-gradient(135deg,#25D366,#128C7E)] focus-visible:text-white focus-visible:shadow-[0_12px_30px_rgba(37,211,102,0.45)] focus-visible:ring-[#25D366]/50",
  },
  {
    key: "instagram",
    href: instagramUrl,
    ariaLabel: "Follow us on Instagram",
    tooltip: "Follow on Instagram",
    Icon: FaInstagram,
    restClassName: "text-[#C13584]",
    iconMotionClassName: "transition-transform duration-300 ease-luxury group-hover:scale-110 group-hover:rotate-6",
    hoverClassName:
      "hover:border-[#D62976]/60 hover:bg-[linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)] hover:text-white hover:shadow-[0_12px_30px_rgba(214,41,118,0.45)] focus-visible:border-[#D62976]/60 focus-visible:bg-[linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)] focus-visible:text-white focus-visible:shadow-[0_12px_30px_rgba(214,41,118,0.45)] focus-visible:ring-[#D62976]/50",
  },
  {
    key: "call",
    href: `tel:${9962743888}`,
    ariaLabel: "Call Raga Designers",
    tooltip: "Call Raga Designers",
    Icon: Phone,
    restClassName: "text-gold",
    iconMotionClassName: "transition-transform duration-300 ease-luxury group-hover:[animation:call-ring_0.5s_ease-in-out]",
    hoverClassName:
      "hover:border-gold/60 hover:bg-linear-to-br hover:from-gold hover:to-gold-light hover:text-white hover:shadow-[0_12px_30px_rgba(79,70,229,0.4)] focus-visible:border-gold/60 focus-visible:bg-linear-to-br focus-visible:from-gold focus-visible:to-gold-light focus-visible:text-white focus-visible:shadow-[0_12px_30px_rgba(79,70,229,0.4)] focus-visible:ring-gold/50",
  },
  {
    key: "email",
    href: "mailto:ragadesigners.sale@gmail.com",
    ariaLabel: "Email us",
    tooltip: "Email Us",
    Icon: Mail,
    restClassName: "text-brand-gold",
    iconMotionClassName: "transition-transform duration-300 ease-luxury group-hover:[animation:email-bounce_0.6s_ease-in-out]",
    hoverClassName:
      "hover:border-brand-gold/60 hover:bg-linear-to-br hover:from-brand-gold hover:to-[#a9793a] hover:text-white hover:shadow-[0_12px_30px_rgba(201,161,74,0.45)] focus-visible:border-brand-gold/60 focus-visible:bg-linear-to-br focus-visible:from-brand-gold focus-visible:to-[#a9793a] focus-visible:text-white focus-visible:shadow-[0_12px_30px_rgba(201,161,74,0.45)] focus-visible:ring-brand-gold/50",
  },
];

export default function ContactCTA() {
  return (
    <div className="flex flex-col gap-2.5">
      

      <div className="grid w-fit grid-cols-2 gap-3 sm:flex sm:gap-3">
        {CONTACT_LINKS.map(({ key, href, ariaLabel, tooltip, Icon, restClassName, iconMotionClassName, hoverClassName }) => (
          <a
            key={key}
            href={href}
            target={key === "instagram" ? "_blank" : undefined}
            rel={key === "instagram" ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel}
            className={`glass group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-luxury hover:-translate-y-1.5 hover:scale-105 focus-visible:-translate-y-1.5 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${restClassName} ${hoverClassName}`}
          >
            <Icon size={19} className={iconMotionClassName} aria-hidden="true" />

            <span
              role="tooltip"
              className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-all duration-300 ease-luxury group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:block"
            >
              {tooltip}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
