const MedalIcon = ({ rank }) => {
  const colors = {
    1: "text-yellow-400",
    2: "text-gray-400",
    3: "text-yellow-600",
  };
  return (
    <svg
      className={`w-10 h-10 ${colors[rank]}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.33 6.95 7.17.62-5.44 4.88 1.64 7.05L12 18.3l-6.7 4.2 1.64-7.05-5.44-4.88 7.17-.62L12 2z" />
      <path d="M12 10.5l-2.67 1.54.7-3-2.17-1.95 3.08-.26L12 4l1.06 2.83 3.08.26-2.17 1.95.7 3L12 10.5z" />
    </svg>
  );
};

export default MedalIcon;
