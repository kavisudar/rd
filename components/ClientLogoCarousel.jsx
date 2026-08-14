import Image from "next/image";

import logo1 from "@/public/assets/images/client-logo/logo1.png";
import logo2 from "@/public/assets/images/client-logo/logo2.png";
import logo3 from "@/public/assets/images/client-logo/logo3.png";
import logo4 from "@/public/assets/images/client-logo/logo4.png";
import logo5 from "@/public/assets/images/client-logo/logo5.png";
import logo6 from "@/public/assets/images/client-logo/logo6.png";
import logo7 from "@/public/assets/images/client-logo/logo7.png";
import logo8 from "@/public/assets/images/client-logo/logo8.png";
import logo9 from "@/public/assets/images/client-logo/logo9.png";
import logo10 from "@/public/assets/images/client-logo/logo10.png";
import logo11 from "@/public/assets/images/client-logo/logo11.png";
import logo12 from "@/public/assets/images/client-logo/logo12.png";


const DEFAULT_LOGOS = [
  { src: logo1, alt: "Client 1 logo" },
  { src: logo2, alt: "Client 2 logo" },
  { src: logo3, alt: "Client 3 logo" },
  { src: logo4, alt: "Client 4 logo" },
  { src: logo5, alt: "Client 5 logo" },
  { src: logo6, alt: "Client 6 logo" },
  { src: logo7, alt: "Client 7 logo" },
  { src: logo8, alt: "Client 8 logo" },
  { src: logo9, alt: "Client 9 logo" },
  { src: logo10, alt: "Client 10 logo" },
  { src: logo11, alt: "Client 11 logo" },
  { src: logo12, alt: "Client 12 logo" },

];

function LogoCard({ logo }) {
  return (
    <div className="glass flex items-center justify-center rounded-2xl px-6 py-4 transition-[transform,box-shadow,border-color] duration-300 ease-luxury hover:scale-105 hover:border-gold/50 hover:shadow-[0_0_24px_rgba(124,58,237,0.3)] sm:px-7 sm:py-5 lg:px-8 lg:py-6">
      <Image
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        className="h-12 w-auto object-contain opacity-90 transition-opacity duration-300 ease-out hover:opacity-100 sm:h-14 lg:h-16"
      />
    </div>
  );
}

export default function ClientLogoCarousel({ logos = DEFAULT_LOGOS, title = "Our Clients" }) {
  return (
    <section className="relative w-full bg-bg py-16 sm:py-20">
      {title && (
        <div className="mx-auto mb-12 max-w-2xl px-6 text-center sm:mb-16 sm:px-8">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">{title}</h2>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-6 px-6 sm:grid-cols-4 sm:gap-8 sm:px-8 lg:px-12">
        {logos.map((logo, i) => (
          <LogoCard key={i} logo={logo} />
        ))}
      </div>
    </section>
  );
}
