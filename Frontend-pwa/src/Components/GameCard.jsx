import { Link } from "react-router-dom";
import StarIcon from "../shapes/StarIcon";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DifficultyRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 3; i++) {
    stars.push(<StarIcon key={i} filled={i <= rating} />);
  }
  return <div className="flex items-center">{stars}</div>;
};

const GameCard = ({
  title,
  description,
  difficulty,
  points,
  imageComponent,
  subject,
}) => {
  const { user, getQuestions } = useContext(AuthContext);
  const standard = user.class;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto flex flex-col">
      <div className="bg-gray-50 h-32 flex items-center justify-center">
        {imageComponent}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
          {description}
        </p>
        <div className="flex justify-between items-center mb-6 text-sm">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-500">Difficulty :</span>
            <DifficultyRating rating={difficulty} />
          </div>
          <span className="font-bold text-indigo-500">+{points} points</span>
        </div>
        <Link
          onClick={() => {
            getQuestions(standard, subject);
          }}
          to="/studentquiz"
          className="w-full bg-purple-300 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
