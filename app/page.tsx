import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WorkTabs from "@/components/WorkTabs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <StatsBar />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <Services />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <Process />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <WorkTabs />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <Testimonials />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <FAQ />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}