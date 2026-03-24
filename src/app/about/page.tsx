"use client";

import HomeHeader from "@/components/dashboard components/homeHeader";
import AboutHero from "@/components/hero-about";
import OriginField from "@/components/origin-field";
import Arrival from "@/components/arrival";
import LearningCurve from "@/components/learning-curve";
import Form from "@/components/form";
import Output from "@/components/output";
import Code from "@/components/code";
import ForwardState from "@/components/forward-state";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <HomeHeader />
        <AboutHero />
        <Arrival />
        <OriginField />
        <LearningCurve />
        <Form />
        <Output />
        <Code />
        <ForwardState />
      <Footer />
    </div>
  );
}