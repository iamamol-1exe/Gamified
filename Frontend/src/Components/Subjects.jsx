import React from "react";
import {
  EngineeringIcon,
  ScienceIcon,
  TechnologyIcon,
  MathematicsIcon,
} from "../shapes/DashBoardShapes";
import SubjectCard from "./SubjectCard";

const Subjects = () => {
  const subjects = [
    {
      title: "Science",
      icon: ScienceIcon,
      description:
        "Explore biology, chemistry, physics, and earth sciences through interactive experiments.",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-200 text-purple-800",
    },
    {
      title: "Technology",
      icon: TechnologyIcon,
      description:
        "Learn about computers, programming, and digital literacy with hands-on activities.",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-200 text-green-800",
    },
    {
      title: "Engineering",
      icon: EngineeringIcon,
      description:
        "Design, build and test solutions to real-world problems using engineering principles.",
      bgColor: "bg-yellow-50",
      buttonColor: "bg-yellow-200 text-yellow-800",
    },
    {
      title: "Mathematics",
      icon: MathematicsIcon,
      description:
        "Master mathematical concepts from arithmetic to algebra through puzzles and games.",
      bgColor: "bg-red-50",
      buttonColor: "bg-red-200 text-red-800",
    },
  ];
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Choose a Subject
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject.title} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
