import GameCard from "../Components/GameCard";

const ReactionBalancerImage = () => (
  <svg viewBox="0 0 300 100" className="w-full h-32 object-contain p-4">
    {/* 2 H2O molecules */}
    <g transform="translate(20, 20)">
      <circle cx="15" cy="15" r="10" fill="#F87171" />
      <circle cx="0" cy="25" r="5" fill="#E0E0E0" />
      <circle cx="30" cy="25" r="5" fill="#E0E0E0" />
    </g>
    <g transform="translate(20, 60)">
      <circle cx="15" cy="15" r="10" fill="#F87171" />
      <circle cx="0" cy="25" r="5" fill="#E0E0E0" />
      <circle cx="30" cy="25" r="5" fill="#E0E0E0" />
    </g>

    {/* Arrow */}
    <line x1="80" y1="50" x2="110" y2="50" stroke="#6B7280" strokeWidth="2" />
    <polyline
      points="105,45 110,50 105,55"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
    />

    {/* H2 molecule */}
    <g transform="translate(130, 40)">
      <circle
        cx="10"
        cy="10"
        r="7"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />
      <circle
        cx="25"
        cy="10"
        r="7"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />
    </g>
    <g transform="translate(130, 60)">
      <circle
        cx="10"
        cy="10"
        r="7"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />
      <circle
        cx="25"
        cy="10"
        r="7"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
      />
    </g>

    {/* Plus Sign */}
    <line x1="185" y1="45" x2="195" y2="55" stroke="#6B7280" strokeWidth="2" />
    <line x1="185" y1="55" x2="195" y2="45" stroke="#6B7280" strokeWidth="2" />
    <text x="190" y="55" fontSize="24" textAnchor="middle" fill="#6B7280">
      +
    </text>

    {/* O2 molecule */}
    <g transform="translate(220, 45)">
      <circle cx="12" cy="12" r="12" fill="#F87171" />
      <circle cx="38" cy="12" r="12" fill="#F87171" />
    </g>
  </svg>
);

const MoleculeManiaImage = () => (
  <svg viewBox="0 0 200 150" className="w-full h-32 object-contain p-4">
    <defs>
      <radialGradient id="gradRed" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
        <stop
          offset="0%"
          style={{ stopColor: "rgb(255,255,255)", stopOpacity: 0.7 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "rgb(239, 68, 68)", stopOpacity: 1 }}
        />
      </radialGradient>
      <radialGradient
        id="gradWhite"
        cx="30%"
        cy="30%"
        r="70%"
        fx="30%"
        fy="30%"
      >
        <stop
          offset="0%"
          style={{ stopColor: "rgb(255,255,255)", stopOpacity: 0.9 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "rgb(229, 231, 235)", stopOpacity: 1 }}
        />
      </radialGradient>
    </defs>
    <circle cx="100" cy="60" r="40" fill="url(#gradRed)" />
    <circle cx="60" cy="100" r="30" fill="url(#gradWhite)" />
    <circle cx="140" cy="100" r="30" fill="url(#gradWhite)" />
  </svg>
);

const ScienceGamepage = () => {
  const games = [
    {
      title: "Solve MCQ",
      description:
        "Test your knowledge with multiple-choice questions covering various science topics. Challenge yourself and earn points for correct answers.",
      difficulty: 2,
      points: 75,
      imageComponent: <MoleculeManiaImage />,
    },
    {
      title: "Reaction Balancer",
      description:
        "Embark on an adventure where you solve Chemistry problems to progress through levels.",
      difficulty: 3,
      points: 50,
      imageComponent: <ReactionBalancerImage />,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-black mb-8">Science Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {games.map((game, index) => (
          <GameCard subject="Science" key={index} {...game} />
        ))}
      </div>
    </div>
  );
};

export default ScienceGamepage;
