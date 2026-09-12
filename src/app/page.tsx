import HomeHeader from "@/components/dashboard components/homeHeader";
import HeroSlider from "@/components/heroslider";
import WhyFynaro from "@/components/whyfynaro";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/calltoaction";
import VideoShowcase from "@/components/mid-footer";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050506] text-white">
      <HomeHeader />

      <HeroSlider />

      <WhyFynaro />

      <Services />

      <Portfolio />

      <Testimonials />

      <CallToAction />

      <VideoShowcase />

      <Footer />
    </main>
  );
}