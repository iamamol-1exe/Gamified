import React from "react";
import { TrophyIcon } from "../shapes/LandingPageShapes";

const Hero = () => (
  <section className="text-center pt-20 pb-16">
    <div className="container mx-auto px-6">
      <div className="flex justify-center mb-8">
        <TrophyIcon></TrophyIcon>
      </div>
      <h1
        className="text-5xl md:text-7xl font-bold mb-4 uppercase"
        style={{
          color: "#4338ca",
          textShadow:
            "2px 2px 0 #c7d2fe, -2px -2px 0 #c7d2fe, 2px -2px 0 #c7d2fe, -2px 2px 0 #c7d2fe, 2px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        Lakshya
      </h1>
      <h2 className="text-2xl text-gray-700 font-semibold mb-6">
        Your gamified learning companion
      </h2>
      <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
        STEM Quest transforms learning into an engaging journey for students in
        rural communities. With interactive games, multilingual lessons, and
        offline access, STEM Quest is designed to work on low-cost devices with
        limited connectivity. Teachers gain powerful tools to monitor student
        engagement, track progress, and improve learning outcomes — making
        education more accessible and fun for everyone.
      </p>
    </div>
  </section>
);

export default Hero;
