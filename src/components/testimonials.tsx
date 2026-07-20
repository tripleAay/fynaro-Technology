"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Chidera Nwoye",
    text: "Fynaro brought clarity to our idea and translated it into a design that feels intentional and confident.",
    image: "/images/profile.png",
  },
  {
    id: 2,
    name: "Okoye C. B.",
    text: "The website feels structured and easy to understand. Clients now trust us before even speaking to us.",
    image: "/images/profile.png",
  },
  
  {
    id: 4,
    name: "Tunde Adebayo",
    text: "Our brand presence improved immediately. Everything now looks deliberate and professionally arranged.",
    image: "/images/profile.png",
  },
  {
    id: 5,
    name: "Daniel Okafor",
    text: "There was a clear process from start to finish. No confusion, just steady progress and strong results.",
    image: "/images/profile.png",
  },
  {
    id: 6,
    name: "Sarah Adeyemi",
    text: "The attention to spacing and flow made everything feel premium without trying too hard.",
    image: "/images/profile.png",
  },
  {
    id: 7,
    name: "Ibrahim Sadiq",
    text: "The final design feels calm and focused. It reflects our brand in a way we couldn’t achieve before.",
    image: "/images/profile.png",
  },
  {
    id: 8,
    name: "Kemi Ogunleye",
    text: "This is the first time our website truly feels like us. Everything just makes sense now.",
    image: "/images/profile.png",
  },
  {
    id: 9,
    name: "Emeka Obi",
    text: "Working with Fynaro brought a level of clarity we didn’t know we were missing.",
    image: "/images/profile.png",
  },
  {
    id: 10,
    name: "Aisha Bello",
    text: "Everything feels simpler, cleaner, and easier to navigate. Our users noticed the difference immediately.",
    image: "/images/profile.png",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url('/images/gustavo-zambelli-0g21m6BJdfc-unsplash (1).jpg')`,
      }}
      className="w-full py-16 md:py-20 xl:py-24 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 xl:mb-14">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold tracking-tight text-black mb-3">
            What clients are saying
          </h2>
          <p className="text-gray-500 text-sm md:text-[15px]">
            Real experiences from people we’ve worked with.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex"
          >
            {testimonials.map((item) => (
              <div key={item.id} className="min-w-full px-4 flex justify-center">
                <div className="max-w-xl w-full text-center">
                  <p className="text-lg md:text-xl leading-7 md:leading-8 text-gray-800 font-light mb-6 md:mb-7">
                    “{item.text}”
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-black">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 md:mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-black" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}