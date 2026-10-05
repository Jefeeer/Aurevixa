import SvgDefs from "@/components/SvgDefs";
import Loader from "@/components/Loader";
import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Problems from "@/components/Problems";
import Services from "@/components/Services";
import Simulator from "@/components/Simulator";
import Process from "@/components/Process";
import Engagement from "@/components/Engagement";
import Why from "@/components/Why";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SvgDefs />
      <a className="skip" href="#main">Skip to content</a>
      <Loader />
      <Effects />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <Problems />
        <Services />
        <Simulator />
        <Process />
        <Engagement />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
