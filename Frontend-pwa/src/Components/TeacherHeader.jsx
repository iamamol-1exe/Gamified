const TeacherHeader = () => {
  return (
    <div className="flex justify-center overflow-hidden">
      <div className="p-6 mt-3.5 rounded-2xl border-gray-100 w-full max-w-6xl">
        <div className="md:flex items-center justify-between flex-col text-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome back, Teacher!
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your students and enhance their learning experience
            </p>
            <p className="text-gray-500 mt-4 mx-auto max-w-2xl leading-relaxed">
              Access student insights, create engaging questions, and
              communicate effectively with your students.
            </p>
          </div>
          <div className="mt-6 md:mt-0"></div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;
