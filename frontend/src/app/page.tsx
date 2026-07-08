import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Packages from "@/components/Packages";
import BookingSection from "@/components/BookingSection";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessTimeline from "@/components/ProcessTimeline";
import InstagramFeed from "@/components/InstagramFeed";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <Packages />
        <BookingSection />
        <Testimonials />
        <WhyChooseUs />
        <ProcessTimeline />
        <InstagramFeed />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <BackToTop />
    </>
  );
}
