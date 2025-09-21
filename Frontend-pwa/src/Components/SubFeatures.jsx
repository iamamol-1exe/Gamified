import { DailyIcon, SmartIcon, StreaksIcon } from "../shapes/LandingPageShapes";
import SubFeatureItem from "./SubFeatureItem";
import React from "react";

const SubFeatures = () => (
  <section className="pb-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        <SubFeatureItem
          icon={<DailyIcon />}
          title="Daily"
          subtitle="Progress Tracking"
        />
        <SubFeatureItem
          icon={<SmartIcon />}
          title="Smart"
          subtitle="Goal Analytics"
        />
        <SubFeatureItem
          icon={<StreaksIcon />}
          title="Streaks"
          subtitle="Habit Building"
        />
      </div>
    </div>
  </section>
);

export default SubFeatures;
