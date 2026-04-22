"use client";

import HomeHeader from "@/components/dashboard components/homeHeader";
import HeroSlider from "../components/heroslider";
import WhyFynaro from "../components/whyfynaro";
import Services from "../components/services";
import Portfolio from "../components/portfolio";
import Testimonials from "../components/testimonials";
import CallToAction from "../components/calltoaction";
import VideoShowcase from "../components/mid-footer";
import Footer from "../components/footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050506] text-white overflow-x-hidden">
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