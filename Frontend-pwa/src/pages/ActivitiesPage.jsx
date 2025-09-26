import React from 'react';
import GameCard from '../Components/GameCard';

// To make this example self-contained, let's create simple placeholder icons here.
// In your project, you would import these from your shapes file.
const ScienceQuizIcon = () => (
  <svg className="w-16 h-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v1.5M15.75 8.477l-1.06 1.06M18 12.253h-1.5M15.75 16.023l-1.06-1.06M12 18.253v-1.5M8.25 16.023l-1.06 1.06M6 12.253H4.5M8.25 8.477l-1.06-1.06M12 21.753a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
  </svg>
);

const ChemistryGameIcon = () => (
  <svg className="w-16 h-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 01-2.373-.823l-.073-.154a2 2 0 01.38-2.197l.073-.154a2 2 0 00.38-2.197l-.073-.154a2 2 0 01-.38-2.197l.073-.154a2 2 0 012.373-.823l.073.154a2 2 0 001.806.547l2.387-.477a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l2.387.477a2 2 0 001.806-.547l.073-.154a2 2 0 012.373.823l-.073.154a2 2 0 01-.38 2.197l.073.154a2 2 0 00-.38 2.197l.073.154a2 2 0 01.38 2.197l-.073.154a2 2 0 01-2.373.823l-.073-.154a2 2 0 00-1.806-.547l-2.387.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86-.517L6.05 15.21a2 2 0 00-1.806.547l-.073.154a2 2 0 01-2.373-.823" />
  </svg>
);

const ActivitiesPage = () => {
  // Define the data for each card in an array
  const activities = [
    {
      title: "Science Quiz",
      description: "Test your knowledge on biology, physics, and more in this challenging quiz.",
      difficulty: 2,
      points: 50,
      imageComponent: <ScienceQuizIcon />,
      subject: "Science",
      route: "/studentquiz", // This card will go to the quiz route
    },
    {
      title: "Reaction Balancer",
      description: "Balance chemical equations in this interactive chemistry game.",
      difficulty: 3,
      points: 75,
      imageComponent: <ChemistryGameIcon />,
      subject: "Chemistry",
      route: "/reaction-balancer", // This card will go to the game route
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-12">Choose an Activity</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <GameCard 
            key={index}
            title={activity.title}
            description={activity.description}
            difficulty={activity.difficulty}
            points={activity.points}
            imageComponent={activity.imageComponent}
            subject={activity.subject}
            route={activity.route}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;