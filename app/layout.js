import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/layout/FloatingParticles";
import GoToTop from "@/components/layout/GoToTop";
import CaseStudyOverlay from "@/components/sections/CaseStudy/CaseStudyOverlay";
import company from "@/data/company.json";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${company.name} | Website Designing & Digital Marketing Agency`,
  description: company.description,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${company.name} | Website Designing & Digital Marketing Agency`,
    description: company.description,
    siteName: company.name,
    images: [{ url: "/assets/images/rd.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Website Designing & Digital Marketing Agency`,
    description: company.description,
    images: ["/assets/images/rd.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/images/rd.png`,
  description: company.description,
  email: company.email,
  telephone: company.phone,
  address: { "@type": "PostalAddress", streetAddress: company.address },
  sameAs: company.socials.map((s) => s.url),
};

export default function RootLayout({ children, casestudy }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <FloatingParticles />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <GoToTop />
          <CaseStudyOverlay>{casestudy}</CaseStudyOverlay>
        </SmoothScroll>
      </body>
    </html>
  );
}
