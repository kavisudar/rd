import Image from "next/image";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";


export default function About() {
  return (
    <section id="about" className="relative flex h-screen w-full items-center overflow-hidden bg-bg">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <FadeIn direction="none" duration={0.6}>
              <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">About Raga Designers</span>
            </FadeIn>

            <RevealText
              as="h2"
              segments={[
                { text: "We Don't Just Design —", className: "text-ink" },
                { text: "We Build Brands That Bring Leads", className: "text-brand-gold-shine font-semibold", shine: true },
              ]}
              className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            />

            <FadeIn delay={0.15} className="flex max-w-xl flex-col gap-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                Raga Designers is a leading web design and development company based in Chennai, with over 15
                years of experience delivering innovative digital solutions to clients across India and more than
                10 countries worldwide. Our services span website design, web development, e-commerce development,
                SEO, and digital marketing — complete, end-to-end solutions tailored to businesses of every size.
              </p>
              <p>
                Every website we build focuses on creativity, responsive design, and exceptional user experience,
                using modern technologies to create fast, secure, and scalable applications. We craft customized
                solutions aligned with each client&apos;s goals and brand identity, built to improve visibility,
                engagement, and growth — with a commitment to quality and on-time delivery that turns projects
                into long-term partnerships.
              </p>
            </FadeIn>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="relative mx-auto aspect-4/5 w-full max-w-sm motion-safe:animate-[float-drift_7s_ease-in-out_infinite] sm:aspect-square lg:aspect-4/5 lg:max-w-md"
              style={{ "--drift-x": "0px", "--drift-y": "-10px" }}
            >
              <FadeIn
                direction="scale"
                duration={1}
                whileHover={{ scale: 1.01 }}
                className="absolute inset-0 overflow-hidden rounded-[28px] border border-[#efe7d8]/70 bg-bg [animation:card-glow-breathe_6s_ease-in-out_infinite]"
              >
                <Image
                  src="/assets/images/rd-logo.png"
                  alt="Raga Designers team at work"
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf8f5]/15 via-transparent to-[#f8f6f2]/15 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/40" />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
