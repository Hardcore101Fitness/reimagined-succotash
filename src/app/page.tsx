import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Programs from "@/components/Programs";
import WhyUs from "@/components/WhyUs";
import Results from "@/components/Results";
import Facility from "@/components/Facility";
import Coaches from "@/components/Coaches";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <Programs />
        <WhyUs />
        <Results />
        <Facility />
        <Coaches />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
