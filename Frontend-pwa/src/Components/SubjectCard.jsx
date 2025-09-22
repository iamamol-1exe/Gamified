import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SubjectCard = ({
  title,
  icon: Icon,
  description,
  bgColor,
  buttonColor,
}) => {
  const choose = {
    Science: "Sciencepage",
    Technology: "Technologypage",
    Engineering: "Engineeringpage",
    Mathematics: "Mathematicspage",
  };
  const targetpage = choose[title];
  return (
    <div
      className={`${bgColor} p-6 rounded-2xl text-center shadow-sm flex flex-col items-center`}
    >
      <Icon />
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>
      <Link
        to={targetpage}
        className={`${buttonColor} hover:opacity-80 hover:scale-105 w-full font-semibold py-3 rounded-lg transition-all duration-200`}
      >
        Explore
      </Link>
    </div>
  );
};
SubjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  description: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
};

export default SubjectCard;
