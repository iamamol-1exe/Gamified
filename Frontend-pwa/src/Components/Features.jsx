import React from "react";

import {
  InteractiveGamesIcon,
  MultilingualContentIcon,
  OfflineAccessIcon,
  PerformanceInsightsIcon,
} from "../shapes/LandingPageShapes";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featuresData = [
    {
      icon: <InteractiveGamesIcon />,
      title: "Interactive Games",
      description:
        "Make learning enjoyable with curriculum-aligned educational games.",
    },
    {
      icon: <MultilingualContentIcon />,
      title: "Multilingual Content",
      description:
        "Access lessons in regional languages for inclusive learning.",
    },
    {
      icon: <OfflineAccessIcon />,
      title: "Offline Access",
      description: "Learn anytime, anywhere — no internet required.",
    },
    {
      icon: <PerformanceInsightsIcon />,
      title: "Performance Insights",
      description:
        "Identify gaps, measure progress, and support personalized learning.",
    },
  ];

  const SubFeatureItem = ({ icon, title, subtitle }) => (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
