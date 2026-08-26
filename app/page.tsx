import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkTabs from "@/components/WorkTabs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <WorkTabs />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hairline-top" />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}