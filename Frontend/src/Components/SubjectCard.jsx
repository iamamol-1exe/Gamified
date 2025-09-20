import React from "react";

const SubjectCard = ({
  title,
  icon: Icon,
  description,
  bgColor,
  buttonColor,
}) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-2xl text-center shadow-sm flex flex-col items-center`}
    >
      <Icon />
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>
      <button
        className={`${buttonColor
          .replace("bg-", "hover:bg-")
          .replace(
            "200",
            "300"
          )} w-full font-semibold py-3 rounded-lg transition`}
      >
        Explore
      </button>
    </div>
  );
};

export default SubjectCard;
