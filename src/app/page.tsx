"use client";

import HomeHeader from "@/components/dashboard components/homeHeader";
import HeroSlider from "../components/heroslider";
import WhyFynaro from "../components/whyfynaro";
import Services from "../components/services";
import Portfolio from "../components/portfolio";
import Testimonials from "../components/testimonials";
import CallToAction from "../components/calltoaction";
import Footer from "../components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <HomeHeader />
      <HeroSlider />
      <WhyFynaro />
      <Services />
      <Portfolio />
      <Testimonials />
      
      <CallToAction />
      <Footer />
    </div>
  );
}