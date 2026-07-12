import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Gateway from "@/components/gateway/Gateway";
import WhyConnectHub from "@/components/about/WhyConnectHub";
import HowItWorks from "@/components/howitworks/HowItWorks";
import Services from "@/components/services/Services";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Gateway />

      <WhyConnectHub />

      <HowItWorks />

      <Services />

      <Footer />
    </>
  );
}