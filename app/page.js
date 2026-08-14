import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Services from "@/components/sections/Services/ServicesSection";
import Portfolio from "@/components/sections/Portfolio/Portfolio";
import CaseStudies from "@/components/case-study/CaseStudies";
import OurProcess from "@/components/OurProcess/OurProcess";
import Reviews from "@/components/sections/Reviews/Reviews";
import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services/>
      <Portfolio/>
      <CaseStudies />
      <OurProcess />
      <ClientLogoCarousel />
      <Reviews />
      <Contact />
    </>
  );
}
